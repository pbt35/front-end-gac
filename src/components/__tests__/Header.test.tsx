import { render, screen } from '@testing-library/react';
import Header from '../Header';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('Header Component', () => {
  it('deve renderizar nome, saldo e transferências', () => {
    render(
      <Header
        name="Laura"
        balance={100}
        transferCount={2}
        onDeposit={jest.fn()}
        onTransfer={jest.fn()}
        onRefreshBalance={jest.fn()}
      />
    );

    expect(screen.getByText('Olá, Laura')).toBeTruthy();
    expect(screen.getByText(/Saldo atual: R\$ 100\.00/)).toBeTruthy();
    expect(screen.getByText(/Transferências realizadas: 2/)).toBeTruthy();
  });
});
