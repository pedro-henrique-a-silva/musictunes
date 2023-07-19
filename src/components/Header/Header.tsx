import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

import './Header.css';

function Header() {
  const [userData, setUserData] = useState<UserType>();

  const { pathname } = useLocation();

  useEffect(() => {
    const getUserName = async () => {
      const userResponse = await getUser();
      setUserData({ ...userResponse });
    };
    getUserName();
  }, []);
  if (pathname !== '/') {
    return (
      <header data-testid="header-component" className="header-container">
        <h1 className="header-logo">LOGO</h1>
        <nav className="header-nav">
          <span
            className="header-username"
            data-testid="header-user-name"
          >
            {(userData) ? userData.name : 'Carregando...'}
          </span>
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
}

export default Header;
