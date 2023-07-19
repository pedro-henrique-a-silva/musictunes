import { Routes, Route } from 'react-router-dom';

import { useState } from 'react';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';

import { AlbumType } from './types';
import Album from './pages/Album/Album';
import Layout from './pages/Layout';

function App() {
  const [albunsData, setAlbunsData] = useState<AlbumType[]>([]);

  const updateAlbunsList = (albuns: AlbumType[]) => {
    setAlbunsData([...albuns]);
  };

  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Login /> } />
        <Route
          path="/search"
          element={ <Search
            albunsData={ albunsData }
            updateAlbunsList={ updateAlbunsList }
          /> }
        />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" />
        <Route path="/profile" />
        <Route path="/profile/edit" />
      </Route>
      <Route path="*" />
    </Routes>
  );
}

export default App;
