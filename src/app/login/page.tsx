'use client'

import LoginForm from '@/components/LoginForm';
import { Card, Typography } from 'antd';
import Link from 'next/link';

const { Title, Text } = Typography;

const LoginPage = () => {
  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Card variant="borderless" style={{ width: 500, textAlign: 'center' }}>
        <Title level={3}>Faça seu Login</Title>
        <LoginForm />

        <div style={{ marginTop: '1rem' }}>
          <Text>Não possui cadastro? <Link href="/register">Clique aqui</Link></Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
