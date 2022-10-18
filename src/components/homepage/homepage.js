import { BellFilled, FundFilled, MessageFilled, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Button, Image, Layout, Menu } from 'antd';
import { Auth, Cache } from 'aws-amplify';
import React from 'react';
import logo from './assets/logo.png';
import './homepage.css';
const { Header, Content } = Layout;

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log(error);
  }
}

export default function Homepage() {
  const { user } = useAuthenticator((context) => [context.user]);
  console.log(Cache.getAllKeys());
  return (
    <Layout className="homepage-layout">
      <Header className="header">
        <Menu mode="horizontal" theme="dark" className="menu">
          <Image src={logo} id="logo" preview={false} />
          <Menu.Item className="menu-item">
            <BellFilled className="item-icon" />
            Thông báo
          </Menu.Item>
          <Menu.Item className="menu-item">
            <MessageFilled className="item-icon" />
            Tin nhắn
          </Menu.Item>
          <Menu.Item className="menu-item">
            <FundFilled className="item-icon" />
            Bảng biểu
          </Menu.Item>
          <Menu.Item className="menu-item">
            <UserOutlined className="item-icon" />
            Thông tin
          </Menu.Item>
        </Menu>
        <div id="div-sign-out-btn">
          <Button type="danger" shape="round" icon={<PoweroffOutlined />} onClick={signOut}>
            Đăng xuất
          </Button>
        </div>
      </Header>

      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280
        }}>
        {user.email}
      </Content>
    </Layout>
  );
}
