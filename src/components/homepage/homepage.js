import { BellFilled, FundFilled, MessageFilled, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
// import { useAuthenticator } from '@aws-amplify/ui-react';
import { Button, Layout, Menu } from 'antd';
import { Auth } from 'aws-amplify';
import React from 'react';
import 'react-clock/dist/Clock.css';
import { Link, Outlet } from 'react-router-dom';
import './homepage.css';

const { Header, Content } = Layout;

export default function Homepage() {
  // const { user } = useAuthenticator((context) => [context.user]);

  return (
    <Layout className="homepage-layout">
      <Header className="header">
        <Menu mode="horizontal" className="menu">
          <Menu.Item className="menu-item">
            <div className="item">
              <BellFilled className="item-icon" />
              <Link to="/notification">Thông báo</Link>
            </div>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <div className="item">
              <MessageFilled className="item-icon" />
              Tin nhắn
            </div>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <div className="item">
              <FundFilled className="item-icon" />
              Bảng biểu
            </div>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <div className="item">
              <UserOutlined className="item-icon" />
              <Link to="/personal-information">Cá nhân</Link>
            </div>
          </Menu.Item>
          <Menu.Item className="menu-item" disabled={true}>
            <div id="div-sign-out-btn">
              <Button type="danger" shape="round" icon={<PoweroffOutlined />} onClick={signOut}>
                Đăng xuất
              </Button>
            </div>
          </Menu.Item>
        </Menu>
      </Header>

      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280
        }}>
        {/* use Outlet to render child componet - see react-router-dom v6 documentation */}
        <Outlet />
      </Content>
    </Layout>
  );
}

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log(error);
  }
}
