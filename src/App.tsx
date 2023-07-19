import { Routes, Route } from 'react-router-dom';

import { useState } from 'react';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';

import { AlbumType } from './types';
import Album from './pages/Album/Album';

function App() {
  const [albunsData, setAlbunsData] = useState<AlbumType[]>([]);

  const updateAlbunsList = (albuns: AlbumType[]) => {
    setAlbunsData([...albuns]);
  };

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route
        path="/search"
        element={ <Search
          albunsData={ albunsData }
          updateAlbunsList={ updateAlbunsList }
        /> }
      />
      <Route path="/album/:id" element={ <Album /> } />
      {/* A rota /favorites irá renderizar a página de Favorites (bônus). */}
      <Route path="/favorites" />
      {/* A rota /profile irá renderizar a página de Profile (bônus). */}
      <Route path="/profile" />
      {/* A rota /profile/edit irá renderizar a página de ProfileEdit (bônus). */}
      <Route path="/profile/edit" />
      {/* Qualquer outra rota irá renderizar a página de NotFound. */}
      <Route path="*" />
    </Routes>
  );
}

export default App;
