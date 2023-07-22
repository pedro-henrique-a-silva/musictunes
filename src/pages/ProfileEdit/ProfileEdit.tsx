import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';

import Loading from '../../components/Loading/Loading';

import './ProfileEdit.css';

const INITIAL_VALUES = {
  name: '',
  email: '',
  image: '',
  description: '',
};

function ProfileEdit() {
  const [user, setUser] = useState<UserType>(INITIAL_VALUES);
  const [imageWorking, setImageWorking] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const verifyEmail = (email: string) => {
    const regexEmail = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(email);
  };

  const verificarLinkDeImagem = () => {
    const img = new Image();
    img.onload = () => setImageWorking(true);
    img.onerror = () => setImageWorking(false);
    img.src = user.image;
  };

  const verifyInputs = () => {
    const email = verifyEmail(user.email);
    const name = user.name !== '';
    const image = user.image !== '';
    const description = user.description !== '';

    return email && name && image && description;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, id } = event.target;

    setUser({
      ...user,
      [id]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (verifyInputs()) {
      updateUser(user);
      navigate('/profile', { state: user });
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getUser();
      setUser(userInfo);
      setIsLoading(false);
    };
    getUserInfo();
  }, []);

  const isButtonEnable = verifyInputs();
  verificarLinkDeImagem();

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="profile-container">
      <form onSubmit={ (event) => handleSubmit(event) }>

        <div className="profile-header">
          {(user?.image && imageWorking)
            ? <img
                src={ user?.image }
                alt="profile"
                onError={ () => setImageWorking(false) }
                data-testid="profile-image"
                className="profile-image-default profile-image"
            />
            : <FaUserCircle
                className="profile-image-default"
                data-testid="profile-image"
            />}
          <label htmlFor="image">
            <h3>Image Url</h3>
            <input
              id="image"
              className="profile-input"
              value={ user?.image }
              onChange={ handleChange }
              type="text"
              data-testid="edit-input-image"
            />
          </label>
        </div>
        <label htmlFor="name" className="profile-data">
          <h3>Nome</h3>
          <input
            id="name"
            className="profile-input"
            value={ user?.name }
            onChange={ handleChange }
            type="text"
            data-testid="edit-input-name"
          />
        </label>
        <label htmlFor="email" className="profile-data">
          <h3>E-mail</h3>
          <input
            id="email"
            className="profile-input"
            value={ user?.email }
            onChange={ handleChange }
            type="text"
            data-testid="edit-input-email"
          />
        </label>
        <label htmlFor="description" className="profile-data">
          <h3>Descrição</h3>
          <textarea
            id="description"
            className="profile-input"
            data-testid="edit-input-description"
            value={ user?.description }
            onChange={ (event) => handleChange(event) }
            cols={ 30 }
            rows={ 10 }
          />
        </label>
        <button
          className="profile-button"
          data-testid="edit-button-save"
          disabled={ (!isButtonEnable) }
        >
          Salvar

        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;

// Um campo para alterar a descrição da pessoa usuária. Este campo precisa ter o atributo ;

// Um campo para alterar a foto da pessoa usuária. Este campo precisa ter o atributo ;

// Um botão para salvar as informações alteradas. Este botão precisa ter o atributo .
