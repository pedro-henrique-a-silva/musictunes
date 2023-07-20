import { useState, useEffect } from 'react';
import { SongType } from '../../types';

import { getFavoriteSongs } from '../../services/favoriteSongsAPI';

import Loading from '../../components/Loading/Loading';
import MusicCard from '../../components/MusicCard/MusicCard';

type FavoritesProps = {
  favorites: SongType[],
  updateFavorites: (songData: SongType[]) => void

};

function Favorites(props: FavoritesProps) {
  const { favorites, updateFavorites } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFavoritesFromStorage = async () => {
      const favoritesData = await getFavoriteSongs();
      if (favoritesData) {
        updateFavorites([...favoritesData]);
        setIsLoading(false);
      }
    };
    getFavoritesFromStorage();
  }, []);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <MusicCard
      favorites={ favorites }
      updateFavorites={ updateFavorites }
      musicList={ favorites }
    />
  );
}

export default Favorites;
