import { SongType } from '../../types';

type MusicCardProps = {
  musicList: SongType[]
};

function MusicCard(props: MusicCardProps) {
  const { musicList } = props;

  return (
    <ul>
      {musicList.map((album) => {
        return (
          <li key={ album.trackId }>
            <span>{album.trackName}</span>
            <audio data-testid="audio-component" src={ album.previewUrl } controls>
              <track kind="captions" />
            </audio>
          </li>
        );
      })}
    </ul>
  );
}

export default MusicCard;
