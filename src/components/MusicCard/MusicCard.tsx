import { useState, useEffect } from 'react';
import { SongType } from '../../types';

import { addSong, removeSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';

import heartEmpty from '../../images/empty_heart.png';
import heartFilled from '../../images/checked_heart.png';

import './MusicCard.css';
import Loading from '../Loading/Loading';

type MusicCardProps = {
  musicList: SongType[],
  favorites: SongType[],
  updateFavorites: (songData: SongType[]) => void

};

function MusicCard(props: MusicCardProps) {
  const { musicList, favorites, updateFavorites } = props;

  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    music: SongType,
  ) => {
    const { checked } = event.target;

    if (checked === true) {
      addSong(music);
      updateFavorites([...favorites, music]);
    } else {
      removeSong(music);
      updateFavorites(favorites.filter((songData) => songData.trackId !== music.trackId));
    }
  };

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
    <ul className="music-list">
      {musicList.map((album) => {
        return (
          <li key={ album.trackId } className="music-item">
            <span>{album.trackName}</span>
            <audio
              className="music-audio"
              data-testid="audio-component"
              src={ album.previewUrl }
              controls
            >
              <track kind="captions" />
            </audio>
            <label
              className="label-favorite"
              data-testid={ `checkbox-music-${album.trackId}` }
              htmlFor={ `favorite-checkbox-${album.trackId}` }
            >
              <input
                id={ `favorite-checkbox-${album.trackId}` }
                className="favorite-checkbox"
                type="checkbox"
                checked={ favorites
                  .find((songData) => songData.trackId === album.trackId) !== undefined }
                onChange={ (event) => handleChange(event, album) }
              />
              <img
                className="heart-icon"
                src={ (favorites
                  .find((songData) => songData.trackId === album.trackId) !== undefined)
                  ? heartFilled : heartEmpty }
                alt="favorite"
              />

            </label>
          </li>
        );
      })}
    </ul>
  );
}

export default MusicCard;
