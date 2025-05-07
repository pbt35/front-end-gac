'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLocalStorageValue } from '@/lib/getLocalStorageValue';
import { Form, InputNumber, Button, Typography, Alert, Card } from 'antd';

const { Title } = Typography;

const DepositPage = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const token = getLocalStorageValue('token');
  const router = useRouter();

  const handleDeposit = async () => {
    setError('');
    setSuccess('');

    if (!amount || amount <= 0) {
      setError('Digite um valor válido');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/deposit', {
        method: 'POST',
        body: JSON.stringify({ amount }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Depósito realizado com sucesso');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setError(data.error || 'Erro ao realizar depósito');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: 'auto' }}>
      <Title level={3}>Fazer depósito</Title>

      {error && (
        <Alert
          type="error"
          message="Erro"
          description={error}
          showIcon
          closable
          onClose={() => setError('')}
          style={{ marginBottom: 16 }}
        />
      )}

      {success && (
        <Alert
          type="success"
          message="Sucesso"
          description={success}
          showIcon
          closable
          onClose={() => setSuccess('')}
          style={{ marginBottom: 16 }}
        />
      )}

      <Form layout="vertical" onFinish={handleDeposit}>
        <Form.Item label="Valor" required>
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            value={amount ?? undefined}
            onChange={(value) => setAmount(value)}
            placeholder="Digite o valor"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Depositar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DepositPage;
