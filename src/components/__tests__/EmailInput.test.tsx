import { render, screen, fireEvent } from '@testing-library/react';
import EmailInput from '../Form/EmailInput';

describe('EmailInput Component', () => {
  it('deve renderizar o input com o valor inicial e responder à mudança de valor', () => {
    const handleChange = jest.fn();

    render(<EmailInput value="teste@email.com" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Email') as HTMLInputElement;

    expect(input).toBeTruthy();
    expect(input.value).toBe('teste@email.com');

    fireEvent.change(input, { target: { value: 'novo@email.com' } });

    expect(handleChange).toHaveBeenCalledWith('novo@email.com');
  });
});
