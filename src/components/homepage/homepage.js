import { BellOutlined, MessageOutlined, PoweroffOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { useAuthenticator } from '@aws-amplify/ui-react';
// import { useAuthenticator } from '@aws-amplify/ui-react';
import { Button, Layout, Menu, notification } from 'antd';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { getUser } from '../../graphql/queries';
import { S3_PREFIX } from '../../utils/params';

import PersonalInformationPopup from '../personalInformationPopup/personalInformationPopup';
import './homepage.css';

const { Content } = Layout;

export default function Homepage() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [api, contextHolder] = notification.useNotification();
  // const navigate = useNavigate();
  const [thisUser, setThisUser] = useState();
  const avatarUrl = S3_PREFIX + localStorage.getItem('avatar');
  console.log(avatarUrl);
  const fetchUser = async () => {
    const data = await API.graphql({
      query: getUser,
      variables: { id: user.attributes.sub }
    });

    if (!localStorage.getItem('avatar')) {
      localStorage.setItem('avatar', data.data.getUser.avatarUrl);
    }

    setThisUser(data.data.getUser);
    return data.data.getUser.avatarUrl;
  };

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
    API.graphql(
      graphqlOperation(`subscription MySubscription {
      onCreateClassInvitation(filter: {targetEmail: {eq: "${user.attributes.email}"}}) {
        id
      }
    }
    `)
    ).subscribe({
      next: (result) => {
        console.log('result', result);
        api.open({
          message: 'Bạn có một lời mời mới',
          description: <Link to="/notification">Xem ngay!</Link>,
          duration: 0
        });
      },
      error: (error) => console.warn(error)
    });
  }, []);

  return (
    <>
      {contextHolder}
      <PersonalInformationPopup />
      <Layout className="homepage-layout">
        <Menu
          mode="horizontal"
          style={{ fontSize: '20px', backgroundColor: '#005566', color: 'white' }}
          className="menu">
          <Menu.Item className="menu-item">
            <div className="item">
              <Link to="/home">
                <img
                  style={{ borderRadius: '50%', height: '7.5vh', width: '7.5vh', border: '0.5px solid #005566' }}
                  className="item-icon"
                  src={avatarUrl}
                />
              </Link>
            </div>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <div className="item">
              <BellOutlined style={{ fontSize: '20px' }} className="item-icon" />
              <Link className="link" to="/notification" style={{ color: 'white' }}>
                Thông báo
              </Link>
            </div>
          </Menu.Item>
          <Menu.Item className="menu-item" onClick={<Navigate to="/class"></Navigate>}>
            <div className="item">
              <UsergroupAddOutlined style={{ fontSize: '20px' }} className="item-icon" />
              <Link className="links" to="/class" style={{ color: 'white' }}>
                Lớp học
              </Link>
            </div>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <div className="item">
              <MessageOutlined style={{ fontSize: '20px' }} className="item-icon" />
              <Link to="/chat" style={{ color: 'white' }}>
                Nhắn tin
              </Link>
            </div>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <div className="item">
              <UserOutlined style={{ fontSize: '20px' }} className="item-icon" />
              <Link to="/personal-information" style={{ color: 'white' }}>
                Thông tin cá nhân
              </Link>
            </div>
          </Menu.Item>

          <Menu.Item className="menu-item" disabled={true}>
            <div id="div-sign-out-btn">
              <Button type="ghost" danger shape="round" icon={<PoweroffOutlined />} onClick={signOut}>
                Đăng xuất
              </Button>
            </div>
          </Menu.Item>
        </Menu>

        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280
          }}>
          {/* use Outlet to render child componet - see react-router-dom v6 documentation */}
          <Outlet context={{ thisUser }} />
        </Content>
      </Layout>
    </>
  );
}
