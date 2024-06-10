import React, { ReactNode, useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Button, Layout as AntLayout, Menu, theme } from 'antd';
import { getCurrentDate } from '../utility/DateUtils';

const { Header, Sider, Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
}

const LayoutUser: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        return "Selamat Pagi";
      } else if (currentHour >= 12 && currentHour < 15) {
        return "Selamat Siang";
      } else if (currentHour >= 15 && currentHour < 18) {
        return "Selamat Sore";
      } else {
        return "Selamat Malam";
      }
    };

    setGreeting(getGreeting());
  }, []);

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
              icon: <DashboardOutlined />,
              label: 'Dashboard',
            },
          ]}
        />
      </Sider>
      <AntLayout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
        <div className="flex justify-between items-center h-full">
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: '100%',
                }}
            />
            <div className="flex flex-col items-end">
                <h4 className="text-black text-sm mb-0 mr-5">{greeting}</h4>
                <p className="text-black text-xs mb-0 mr-5">{getCurrentDate()}</p>
            </div>
        </div>
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
