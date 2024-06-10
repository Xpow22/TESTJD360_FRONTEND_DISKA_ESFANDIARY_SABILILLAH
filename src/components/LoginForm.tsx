import React from 'react';
import { Form, Input, Button } from 'antd';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const onFinish = (values: { username: string, password: string }) => {
    onLogin(values.username, values.password);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please enter your username' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
