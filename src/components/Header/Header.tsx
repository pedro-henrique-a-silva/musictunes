import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

import headPhonesLogo from '../../images/headphones.png';
import './Header.css';

function Header() {
  const [userData, setUserData] = useState<UserType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserName = async () => {
      const userResponse = await getUser();
      setUserData(userResponse);
      setIsLoading(false);
    };
    getUserName();
  }, []);

  return (
    <header data-testid="header-component" className="header-container">
      <img src={ headPhonesLogo } alt="logotipo" className="header-logo" />
      <nav className="header-nav">
        <Link to="/" className="header-user-link">
          <span
            className="header-username"
            data-testid="header-user-name"
          >
            {(!isLoading) ? userData?.name : 'Carregando...'}
          </span>
        </Link>
        <NavLink
          className="header-link"
          to="/search"
          data-testid="link-to-search"
        >
          Search

        </NavLink>
        <NavLink
          className="header-link"
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Favorites

        </NavLink>
        <NavLink
          className="header-link"
          to="/profile"
          data-testid="link-to-profile"
        >
          Profile

        </NavLink>

      </nav>
    </header>
  );
}

export default Header;
