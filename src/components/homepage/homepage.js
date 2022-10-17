import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Auth, Cache } from 'aws-amplify';
import React, { createElement } from 'react';
import './homepage.css';
const { Header, Content, Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`
      };
    })
  };
});

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log(error);
  }
}

export default function Homepage() {
  console.log(Cache.getAllKeys());
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu mode="horizontal" theme="dark">
          <Menu.Item>1</Menu.Item>
          <Menu.Item>2</Menu.Item>
          <Menu.Item>3</Menu.Item>
          <Menu.Item onClick={signOut}>Sign Out</Menu.Item>
        </Menu>
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} onClick={props.signOut} /> */}
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}>
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
