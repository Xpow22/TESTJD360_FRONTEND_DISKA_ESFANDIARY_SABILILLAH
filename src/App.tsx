import { useState, useEffect } from 'react';
import { Modal, message } from 'antd';
import LayoutUser from './components/Layout';
import OrderForm from './components/OrderForm';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sessionTimer, setSessionTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') { 
      setIsAuthenticated(true);
      message.success('Login successful');
      // Modal.destroyAll();
    } else {
      message.error('Invalid username or password');
    }
  };

  useEffect(() => {
    const startSessionTimer = () => {
      console.log('test')
      if (sessionTimer) {
        clearTimeout(sessionTimer);
      }
      const timer = setTimeout(() => {
        handleLogout();
        console.log('test')
      }, 300000); 
      setSessionTimer(timer);
    };

    const handleLogout = () => {
      setIsAuthenticated(false);
      setSessionTimer(null); 
      message.info('Session expired, please login again');
    };

    if (isAuthenticated) {
      startSessionTimer();
    }

    return () => {
      if (sessionTimer) {
        clearTimeout(sessionTimer);
      }
    };
  }, [isAuthenticated]);

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
    <LayoutUser>
      {isAuthenticated ? (
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
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </LayoutUser>
  );
};

export default App;
