import { BellOutlined, FormOutlined, PoweroffOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { useAuthenticator } from '@aws-amplify/ui-react';
// import { useAuthenticator } from '@aws-amplify/ui-react';
import { Button, Layout, Menu } from 'antd';
import { API, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { getUser } from '../../graphql/queries';

import PersonalInformationPopup from '../personalInformationPopup/personalInformationPopup';
import './homepage.css';
const { Content } = Layout;

export default function Homepage() {
  const { user } = useAuthenticator((context) => [context.user]);

  const [avatarUrl, setAvatarUrl] = useState('');
  const [thisUser, setThisUser] = useState();
  console.log('====================================');
  console.log('this User', thisUser);
  console.log('====================================');

  const getAvatarUrl = async () => {
    const data = await API.graphql({
      query: getUser,
      variables: { id: user.attributes.sub }
    });
    setAvatarUrl(data.data.getUser.avatarUrl);
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

  const handleSetAvatarUrl = (avatarUrl) => {
    setAvatarUrl(avatarUrl);
  };

  useEffect(() => {
    getAvatarUrl();
  }, []);

  return (
    <>
      <PersonalInformationPopup handleSetAvatarUrl={handleSetAvatarUrl} />
      <Layout className="homepage-layout">
        <Menu mode="horizontal" theme="light" style={{ fontSize: '20px' }} className="menu">
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
              <Link to="/notification">Thông báo</Link>
            </div>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <div className="item">
              <FormOutlined style={{ fontSize: '20px' }} className="item-icon" />
              <Link to="/forum">Diễn đàn</Link>
            </div>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <div className="item">
              <UserOutlined style={{ fontSize: '20px' }} className="item-icon" />
              <Link to="/personal-information">Thông tin cá nhân</Link>
            </div>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <div className="item">
              <UsergroupAddOutlined style={{ fontSize: '20px' }} className="item-icon" />
              <Link to="/class">Lớp học</Link>
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
          <Outlet context={{ thisUser, handleSetAvatarUrl }} />
        </Content>
      </Layout>
    </>
  );
}
