'use client';

import { getLocalStorageValue } from '@/lib/getLocalStorageValue';
import { useEffect, useState } from 'react';
import { ListItem } from '@/components/ListItem';

type Transaction = {
  id: string;
  type: 'DEPOSIT' | 'TRANSFER';
  amount: number;
  reversed: boolean;
  createdAt: string;
  toUserId: string;
  toUser: {
    name: string;
    email: string;
  };
};

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isReversing, setIsReversing] = useState<string | null>(null); 
  const token = getLocalStorageValue('token');

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token) {
        setError('Token de autenticação não encontrado');
        return;
      }

      setLoading(true);
      try {
        const res = await fetch('/api/transactions', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setTransactions(data);
        } else {
          setError(data.error || 'Erro ao carregar transações');
        }
      } catch (err) {
        setError(`${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  const handleReverse = async (operationId: string) => {
    setIsReversing(operationId);
    setError('');
    try {
      const res = await fetch('/api/reverse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ operationId }),
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.error || 'Erro ao reverter');
  
      alert('Operação revertida com sucesso');
      setTransactions((prev) =>
        prev.map((t) => (t.id === operationId ? { ...t, reversed: true } : t))
      );
    } catch (err) {
      setError(`Erro: ${err}`);
    } finally {
      setIsReversing(null);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Extrato de Transações</h2>
      {loading && <p>Carregando extrato...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && transactions.length === 0 && <p>Nenhuma transação encontrada.</p>}
      {transactions.map((transaction) => (
        <ListItem
          key={transaction.id}
          transaction={transaction}
          onReverse={handleReverse}
          isReversing={isReversing === transaction.id}
        />
      ))}
    </div>
  );
}
