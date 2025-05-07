'use client';

import { Card, Typography, Button, Space } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, PoweroffOutlined, SyncOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const { Title, Text } = Typography;

type HeaderProps = {
  name: string;
  balance: number;
  transferCount: number;
  onDeposit: () => void;
  onTransfer: () => void;
  onRefreshBalance: () => void;
};

const Header = ({
  name,
  balance,
  transferCount,
  onDeposit,
  onTransfer,
  onRefreshBalance
}: HeaderProps) => {
  const router = useRouter();

  const [showBalance, setShowBalance] = useState<boolean>(true);

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.push('/login');
  };

  return (
    <Card variant="borderless" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', right: '10px' }}>
        <Button type="text" icon={<PoweroffOutlined />} danger onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div style={{ position: 'absolute', left: '10px' }}>
        <Button type="text" icon={showBalance ? <EyeInvisibleOutlined /> : <EyeOutlined />} onClick={toggleBalanceVisibility}>
        {showBalance ? 'Ocultar Saldo' : 'Mostrar Saldo'}
        </Button>
      </div>

      <Title level={4}>Olá, {name}</Title>
      <Text>
          Saldo atual: {showBalance ? `R$ ${balance.toFixed(2)}` : '********'}{' '}
          <Button shape="circle" icon={<SyncOutlined />} onClick={onRefreshBalance} />
      </Text><br />
      <Text>Transferências realizadas: {transferCount}</Text><br />

      <Space
        direction="vertical"
        style={{ marginTop: '1rem', width: '100%' }}
        size="middle"
      >
        <Button type="primary" onClick={onDeposit}>
          Fazer Depósito
        </Button>
        <Button type="default" onClick={onTransfer}>
          Nova Transferência
        </Button>
      </Space>
    </Card>
  );
};

export default Header;
