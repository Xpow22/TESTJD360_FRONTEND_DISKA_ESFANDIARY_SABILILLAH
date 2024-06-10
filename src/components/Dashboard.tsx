import React from 'react';
import { Table, Button, Space } from 'antd';
import { WhatsAppOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

interface DashboardProps {
  orders: Order[];
  openModal: (order?: Order) => void;
  deleteOrder: (key: string) => void;
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

const Dashboard: React.FC<DashboardProps> = ({ orders, openModal, deleteOrder }) => {
  const columns = [
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Sumber Pesanan',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'HP',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Jumlah Roti',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Keterangan',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'Action',
      key: 'action',

      render: (_text: string, record: Order) => (
        <Space size="middle">
          <Button onClick={() => openModal(record)}>Edit</Button>
          <Button type="primary" danger onClick={() => deleteOrder(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const orderCounts = {
    Whatsapp: orders.filter(order => order.source === 'Whatsapp').length,
    Call: orders.filter(order => order.source === 'Call').length,
    Email: orders.filter(order => order.source === 'Email').length,
  };

  return (
    <div>
      <h1 className="text-dark font-bold text-3xl mb-4">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-500 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">{orderCounts.Whatsapp}</h2>
            <p className="text-white">Whatsapp</p>
          </div>
          <WhatsAppOutlined className="text-white text-4xl" />
        </div>
        <div className="bg-blue-500 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">{orderCounts.Call}</h2>
            <p className="text-white">Call</p>
          </div>
          <PhoneOutlined className="text-white text-4xl" />
        </div>
        <div className="bg-purple-500 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">{orderCounts.Email}</h2>
            <p className="text-white">Email</p>
          </div>
          <MailOutlined className="text-white text-4xl" />
        </div>
      </div>
      <div className="mb-4">
        <Button type="primary" onClick={() => openModal()}>Add Order</Button>
      </div>
      <Table columns={columns} dataSource={orders} />
    </div>
  );
};

export default Dashboard;
