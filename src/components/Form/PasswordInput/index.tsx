import { Input } from 'antd';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PasswordInput = ({ value, onChange }: PasswordInputProps) => (
  <Input.Password
    placeholder="Senha"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default PasswordInput;
