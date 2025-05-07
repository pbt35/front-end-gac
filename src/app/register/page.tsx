'use client'

import { useState } from 'react'
import { Card, Form, Input, Button, Typography, Alert } from 'antd'
import { useRouter } from 'next/navigation';

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const { Title, Text } = Typography

export default function RegisterPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const router = useRouter()

  const handleSubmit = async (values: RegisterFormValues) => {
    const { name, email, password, confirmPassword } = values

    if (password !== confirmPassword) {
      setAlert({ type: 'error', message: 'As senhas não coincidem' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        setAlert({ type: 'success', message: 'Usuário cadastrado com sucesso!' })
        form.resetFields()
        router.push('/login')
      } else {
        setAlert({ type: 'error', message: data.error || 'Erro ao cadastrar' })
      }
    } catch {
      setAlert({ type: 'error', message: 'Erro ao cadastrar' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Card style={{ width: 400 }}>
        <Title level={3} style={{ textAlign: 'center' }}>Cadastro</Title>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            showIcon
            style={{ marginBottom: 16 }}
            closable
            onClose={() => setAlert(null)}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: 'Digite seu nome' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: 'Digite seu e-mail' }, { type: 'email', message: 'E-mail inválido' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Digite sua senha' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirmar Senha"
            name="confirmPassword"
            rules={[{ required: true, message: 'Confirme sua senha' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
        <div style={{alignItems: 'center'}}>
          <Text type="secondary">
            Já possui uma conta? <a href="/login">Faça login</a>
          </Text>
        </div>
      </Card>
    </div>
  )
}
