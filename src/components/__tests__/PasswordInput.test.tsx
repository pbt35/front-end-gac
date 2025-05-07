import { render, screen, fireEvent } from '@testing-library/react';
import PasswordInput from '../Form/PasswordInput';

describe('PasswordInput Component', () => {
  it('deve renderizar o input de senha com o valor inicial e responder à mudança de valor', () => {
    const handleChange = jest.fn();

    render(<PasswordInput value="123456" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Senha') as HTMLInputElement;

    expect(input).toBeTruthy();
    expect(input.value).toBe('123456');

    fireEvent.change(input, { target: { value: 'novasenha' } });

    expect(handleChange).toHaveBeenCalledWith('novasenha');
  });
});
