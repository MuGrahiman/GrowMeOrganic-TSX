import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useValidate from '../Hook/useValidate';

interface Props {
  children: React.ReactNode;
}

const RouterProtector: React.FC<Props> = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [validateData] = useValidate();
  const navigate = useNavigate();

  useEffect(() => {
    const storedFormDataString = localStorage.getItem('formData');
    const storedFormData = storedFormDataString ? JSON.parse(storedFormDataString) : null;

    if (storedFormData) {
      validateData(storedFormData)
        .then(() => {
          setSuccess(true);
        })
        .catch(() => {
          setSuccess(false);
          navigate('/');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSuccess(false);
      setLoading(false);
      navigate('/');
    }
  }, []);

  // Conditional rendering based on validation result
  return loading ? null : success ? <>{children}</> : null;
};

export default RouterProtector;
