import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MusicCard from '../../components/MusicCard/MusicCard';
import Loading from '../../components/Loading/Loading';
import getMusics from '../../services/musicsAPI';

import { AlbumType, SongType } from '../../types';

import './Album.css';

type AlbumProps = {
  favorites: SongType[],
  updateFavorites: (songData: SongType[]) => void
};

function Album(props: AlbumProps) {
  const { favorites, updateFavorites } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [albumData, setAlbumData] = useState<[AlbumType, ...SongType[]]>();

  const { id } = useParams();

  useEffect(() => {
    const getAlbumData = async () => {
      const albumInformation = await getMusics(id as string);
      setIsLoading(false);
      setAlbumData([...albumInformation]);
    };
    getAlbumData();
  }, [id]);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      {(albumData)
        && (
          <>
            <div className="artist-info">
              <img
                className="img-album"
                src={ albumData[0].artworkUrl100 }
                alt="imagem do album"
              />
              <h2
                data-testid="album-name"
                className="artist-album-name"
              >
                {albumData[0].collectionName}

              </h2>
              <p
                data-testid="artist-name"
                className="artistName"
              >
                {albumData[0].artistName}

              </p>
            </div>
            <MusicCard
              favorites={ favorites }
              updateFavorites={ updateFavorites }
              musicList={ albumData
                .filter((album, idArray) => idArray !== 0) as SongType[] }
            />
          </>
        )}
    </div>
  );
}

export default Album;
