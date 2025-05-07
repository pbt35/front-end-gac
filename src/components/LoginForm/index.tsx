'use client';

import { useState } from 'react';
import { Form, Alert } from 'antd';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import EmailInput from '../Form/EmailInput';
import PasswordInput from '../Form/PasswordInput';
import SubmitButton from '../Form/SubmitButton';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setToken } = useUser();
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError(`${err} - Erro ao conectar com o servidor`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleLogin} layout="vertical">
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Digite seu email' }]}>
        <EmailInput value={email} onChange={setEmail} />
      </Form.Item>
      <Form.Item label="Senha" name="password" rules={[{ required: true, message: 'Digite sua senha' }]}>
        <PasswordInput value={password} onChange={setPassword} />
      </Form.Item>
      <Form.Item>
        <SubmitButton loading={loading} />
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
