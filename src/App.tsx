import React, { useState } from 'react';
import { Modal } from 'antd';
import CustomLayout from './components/Layout';
import OrderForm from './components/OrderForm';
import Dashboard from './Dashboard';

interface Order {
  key: string;
  source: string;
  name: string;
  phone: string;
  email?: string;
  quantity: number;
  notes: string;
}

const App = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | undefined>(undefined);

  const addOrder = (order: Order) => {
    if (editingOrder) {
      setOrders(orders.map(o => o.key === order.key ? order : o));
    } else {
      setOrders([...orders, order]);
    }
  };

  const deleteOrder = (key: string) => {
    setOrders(orders.filter(order => order.key !== key));
  };

  const showModal = (order?: Order) => {
    setEditingOrder(order);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingOrder(undefined);
  };

  return (
    <CustomLayout>
      <div className="p-4">
        <Dashboard orders={orders} openModal={showModal} deleteOrder={deleteOrder} />
        <Modal
          title={editingOrder ? 'Edit Order' : 'Add Order'}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <OrderForm addOrder={addOrder} closeModal={handleCancel} editOrder={editingOrder} />
        </Modal>
      </div>
    </CustomLayout>
  );
};

export default App;
