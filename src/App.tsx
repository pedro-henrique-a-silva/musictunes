import { Routes, Route } from 'react-router-dom';

import { useState } from 'react';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';

import { AlbumType, SongType } from './types';
import Album from './pages/Album/Album';
import Layout from './pages/Layout';
import Favorites from './pages/Favorites/Favorites';

function App() {
  const [albunsData, setAlbunsData] = useState<AlbumType[]>([]);
  const [favorites, setFavorites] = useState<SongType[]>([]);

  const updateFavorites = (songData: SongType[]) => {
    setFavorites(songData);
  };

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
        <Route
          path="/album/:id"
          element={ <Album
            favorites={ favorites }
            updateFavorites={ updateFavorites }
          /> }
        />
        <Route
          path="/favorites"
          element={ <Favorites
            favorites={ favorites }
            updateFavorites={ updateFavorites }
          /> }
        />
        <Route path="/profile" />
        <Route path="/profile/edit" />
      </Route>
      <Route path="*" />
    </Routes>
  );
}

export default App;
