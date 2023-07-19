import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createUser } from '../../services/userAPI';

import Loading from '../../components/Loading/Loading';

import './Login.css';

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
    <form
      onSubmit={ handleSubmit }
      className="form-login"
    >
      <h1>Login</h1>
      <input
        type="text"
        className="form-input"
        data-testid="login-name-input"
        value={ inputData }
        onChange={ (event) => setInputData(event.target.value) }
      />
      <button
        className="form-button"
        data-testid="login-submit-button"
        disabled={ (inputData.length < 3) }
      >
        Entrar

      </button>
    </form>
  );
}

export default Login;
