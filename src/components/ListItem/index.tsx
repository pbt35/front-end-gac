'use client';

import { Button } from 'antd';
import { useState } from 'react';

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

type Props = {
  transaction: Transaction;
  onReverse: (id: string) => void;
  isReversing: boolean;
};

export const ListItem = ({ transaction, onReverse, isReversing }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const getTransactionName = (type: string) => {
    if(type === 'TRANSFER'){
      return 'Transferência'
    }
      return 'Depósito Realizado'
  }

  return (
    <div style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{getTransactionName(transaction.type)} - R$ {transaction.amount}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div style={{ marginTop: '0.5rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}>
          <div>

          <div><strong>Data:</strong> {new Date(transaction.createdAt).toLocaleString()}</div>
          <div><strong>Status:</strong> {transaction.reversed ? 'Revertida' : 'Completa'}</div>

          {transaction.type === 'TRANSFER' && transaction.toUser && (
            <div><strong>Transferido para:</strong> {transaction.toUser.name} ({transaction.toUser.email})</div>
          )}

          {transaction.type === 'DEPOSIT' && (
            <div><strong>Origem:</strong> Depósito direto</div>
          )}
          </div>

          {!transaction.reversed && (
            <Button
              onClick={() => onReverse(transaction.id)}
              disabled={isReversing}
              style={{
                marginTop: '10px',
                backgroundColor: 'red',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {isReversing ? 'Revertendo...' : 'Reverter Operação'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
