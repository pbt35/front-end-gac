import { Input } from 'antd';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailInput = ({ value, onChange }: EmailInputProps) => (
  <Input
    type="email"
    placeholder="Email"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default EmailInput;
