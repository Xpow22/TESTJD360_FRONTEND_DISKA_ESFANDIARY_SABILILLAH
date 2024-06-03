import React, { useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';

interface OrderFormProps {
  addOrder: (order: Order) => void;
  editOrder?: Order;
  closeModal: () => void;
}

interface Order {
  key: string;
  source: string;
  name: string;
  phone: string;
  email?: string;
  quantity: number;
  notes: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ addOrder, editOrder, closeModal }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editOrder) {
      form.setFieldsValue(editOrder);
    }
  }, [editOrder, form]);

  const onFinish = (values: Order) => {
    addOrder({ ...values, key: editOrder?.key || `${Date.now()}` });
    closeModal();
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="source"
        label="Source"
        rules={[{ required: true, message: 'Please select the source' }]}
      >
        <Select>
          <Select.Option value="Whatsapp">Whatsapp</Select.Option>
          <Select.Option value="Call">Call</Select.Option>
          <Select.Option value="Email">Email</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter the name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: 'Please enter the phone number' },
          { pattern: /^\d+$/, message: 'Please enter a valid phone number' }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="quantity"
        label="Quantity"
        rules={[{ required: true, message: 'Please enter the quantity' }]}
      >
        <Input type="number" min={1} />
      </Form.Item>
      <Form.Item
        name="notes"
        label="Notes"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editOrder ? 'Update Order' : 'Add Order'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrderForm;
