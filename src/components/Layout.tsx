import React, { ReactNode, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout as AntLayout, Menu, theme } from 'antd';

const { Header, Sider, Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
}

const LayoutUser: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AntLayout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="flex justify-center items-center my-2">
          <img
            src="https://media.istockphoto.com/id/1291582566/id/vektor/logo-desain-vektor-roti-dan-kue-roti.jpg?s=612x612&w=0&k=20&c=u12ry-rhywQj6Wf3xQUY6F8vV8DttZVHXR-waxOFjcc="
            alt="Logo"
            className="w-16 h-16"
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <AntLayout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default LayoutUser;