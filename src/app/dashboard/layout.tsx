'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Row, Col, Typography, Spin, Alert } from 'antd';
import Header from '@/components/Header';
import { getLocalStorageValue } from '@/lib/getLocalStorageValue';
import { useUserStore } from '@/contexts/useUserStore';

const { Title } = Typography;

type UserData = {
  id: string;
  name: string;
  email: string;
  balance: number;
  transferCount: number;
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = getLocalStorageValue('token');

  const { setName, setBalance, setTransferCount } = useUserStore();

  const refreshBalance = async () => {
    try {
      const response = await fetch('/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) throw new Error('Erro ao atualizar saldo');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Erro ao atualizar saldo:', error);
    }
  };


  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Erro ao carregar os dados do usuário');

        const data = await response.json();
        setUserData(data);
        localStorage.setItem('userId', data.id);
        setName(data.name);
        setBalance(data.balance);
        setTransferCount(data.transferCount);
      } catch (err) {
        setError('Não foi possível carregar os dados');
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, router, setBalance, setName, setTransferCount]);

  if (loading) return <Spin fullscreen />;
  if (error) {
    return <Alert type="error" message="Erro" description={error} showIcon />;
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Title level={2}>Bem-vindo à sua carteira</Title>
        </Col>

        {userData && (
          <Col xs={24} sm={24} md={12} lg={24}>
            <Header
              name={userData.name}
              balance={userData.balance}
              transferCount={userData.transferCount}
              onDeposit={() => router.push('/dashboard/deposit')}
              onTransfer={() => router.push('/dashboard/transfer')}
              onRefreshBalance={refreshBalance}
            />
          </Col>
        )}
      </Row>

      <div style={{ marginTop: '2rem' }}>
        {children}
      </div>
    </div>
  );
}
