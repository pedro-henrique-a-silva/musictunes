import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

import './Profile.css';
import Loading from '../../components/Loading/Loading';

function Profile() {
  const [user, setUser] = useState<UserType>();
  const [isLoading, setIsLoading] = useState(true);
  const [imageWorking, setImageWorking] = useState(true);

  const { state } = useLocation();

  const verificarLinkDeImagem = () => {
    const img = new Image();
    img.onload = () => setImageWorking(true);
    img.onerror = () => setImageWorking(false);
    img.src = user?.image as string;
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getUser();

      if (state) {
        console.log(state);
        setUser(state);
      } else {
        setUser(userInfo);
      }

      setIsLoading(false);
    };
    getUserInfo();
  }, []);

  verificarLinkDeImagem();

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        {(user?.image && imageWorking)
          ? <img
              src={ user?.image }
              onError={ () => setImageWorking(false) }
              alt="profile"
              data-testid="profile-image"
              className="profile-image-default profile-image"
          />
          : <FaUserCircle
              className="profile-image-default"
              data-testid="profile-image"
          />}
        <Link className="profile-edit-link" to="/profile/edit">Editar perfil</Link>
      </div>
      <div className="profile-data">
        <h3>Nome</h3>
        <p>{(user?.name) ? user.name : ''}</p>
      </div>
      <div className="profile-data">
        <h3>E-mail</h3>
        <p>{(user?.email) ? user.email : 'Sem Informações'}</p>
      </div>
      <div className="profile-data">
        <h3>Descrição</h3>
        <p>{(user?.description) ? user.description : 'Sem Informações'}</p>
      </div>
    </div>
  );
}

export default Profile;
