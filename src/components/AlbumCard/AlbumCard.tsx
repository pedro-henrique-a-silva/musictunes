import { Link } from 'react-router-dom';

import { AlbumType } from '../../types';

type AlbumCardProp = {
  albunsData: AlbumType[],
};

function AlbumCard(props: AlbumCardProp) {
  const { albunsData } = props;

  return (
    <div className="albuns-container">
      {(albunsData.length === 0)
        ? <h2>Nenhum álbum foi encontrado</h2>
        : albunsData.map((album) => {
          return (
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
              key={ album.collectionId }
              className="album-card"
            >
              <img src={ album.artworkUrl100 } alt="Foto album" />
              <h4>{album.collectionName}</h4>
              <p>{album.artistName}</p>

            </Link>
          );
        })}
    </div>
  );
}

export default AlbumCard;
