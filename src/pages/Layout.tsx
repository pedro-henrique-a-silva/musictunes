import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';

function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      {(pathname !== '/') && <Header />}
      <Outlet />
    </>
  );
}

export default Layout;
