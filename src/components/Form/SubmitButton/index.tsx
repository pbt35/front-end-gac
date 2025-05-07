import { Button } from 'antd';

interface SubmitButtonProps {
  loading: boolean;
}

const SubmitButton = ({ loading }: SubmitButtonProps) => (
  <Button type="primary" htmlType="submit" block loading={loading}>
    Entrar
  </Button>
);

export default SubmitButton;
