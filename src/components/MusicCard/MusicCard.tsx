import { useState } from 'react';
import { SongType } from '../../types';

import heartEmpty from '../../images/empty_heart.png';
import heartFilled from '../../images/checked_heart.png';

import './MusicCard.css';

type MusicCardProps = {
  musicList: SongType[]
};

function MusicCard(props: MusicCardProps) {
  const { musicList } = props;

  const [favorites, setFavorites] = useState<number[]>([]);

  const handleChange = (musicId: number) => {
    if (favorites.includes(musicId)) {
      setFavorites(favorites.filter((id) => id !== musicId));
    } else {
      setFavorites([...favorites, musicId]);
    }
  };

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
                checked={ favorites.includes(album.trackId) }
                onChange={ () => handleChange(album.trackId) }
              />
              <img
                className="heart-icon"
                src={ favorites.includes(album.trackId)
                  ? heartFilled : heartEmpty }
                alt="favorite"
              />
              {/* <span
                className={ `heart-icon ${favorites.includes(album.trackId)
                  ? 'filled' : 'empty'}` }
              /> */}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

export default MusicCard;
