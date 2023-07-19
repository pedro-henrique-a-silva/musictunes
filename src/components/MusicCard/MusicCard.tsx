import { SongType } from '../../types';

import './MusicCard.css';

type MusicCardProps = {
  musicList: SongType[]
};

function MusicCard(props: MusicCardProps) {
  const { musicList } = props;

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
          </li>
        );
      })}
    </ul>
  );
}

export default MusicCard;
