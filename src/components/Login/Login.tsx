import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createUser } from '../../services/userAPI';

import Loading from '../Loading/Loading';

function Login() {
  const [inputData, setInputData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await createUser({ name: inputData });
    navigate('/search');
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        data-testid="login-name-input"
        value={ inputData }
        onChange={ (event) => setInputData(event.target.value) }
      />
      <button
        data-testid="login-submit-button"
        disabled={ (inputData.length < 3) }
      >
        Entrar

      </button>
    </form>
  );
}

export default Login;
