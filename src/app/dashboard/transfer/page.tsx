'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLocalStorageValue } from '@/lib/getLocalStorageValue';
import { Form, Input, InputNumber, Button, Typography, Alert, Card } from 'antd';

const { Title } = Typography;

const TransferPage = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = getLocalStorageValue('token');
  const router = useRouter();

  const handleTransfer = async () => {
    setError('');

    if (!recipientEmail || !amount || amount <= 0) {
      setError('Digite um email e um valor válidos');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/transfer', {
        method: 'POST',
        body: JSON.stringify({ recipientEmail, amount }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert('Transferência realizada com sucesso');
        router.push('/dashboard');
      } else {
        setError(data.error || 'Erro ao realizar transferência');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 500, margin: 'auto' }}>
      <Title level={3}>Transferir saldo</Title>

      {error && (
        <Alert
          type="error"
          message="Erro"
          description={error}
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Form layout="vertical" onFinish={handleTransfer}>
        <Form.Item label="Email do destinatário" required>
          <Input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="Digite o email"
          />
        </Form.Item>

        <Form.Item label="Valor" required>
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            value={amount ?? undefined}
            onChange={(value) => setAmount(value)}
            placeholder="Digite o valor"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Transferir
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TransferPage;
