import React, { useState } from 'react';
import Loading from '../../components/Loading/Loading';
import AlbumCard from '../../components/AlbumCard/AlbumCard';

import searchAlbumsAPI from '../../services/searchAlbumsAPI';

import './Search.css';

import { AlbumType } from '../../types';

type SearchProp = {
  albunsData: AlbumType[],
  updateAlbunsList: (albuns: AlbumType[]) => void
};

function Search(props: SearchProp) {
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { albunsData, updateAlbunsList } = props;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(searchInput);
    setSearchInput('');
    setIsLoading(true);
    const albuns = await searchAlbumsAPI(searchInput);
    updateAlbunsList(albuns);
    setIsLoading(false);
    setIsFirstTime(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <form
        onSubmit={ handleSubmit }
        className="form-search"
      >
        <input
          type="text"
          className="form-input search-input"
          data-testid="search-artist-input"
          value={ searchInput }
          onChange={ handleChange }
        />
        <button
          className="form-button search-button"
          data-testid="search-artist-button"
          disabled={ (searchInput.length < 2) }
        >
          Pesquisar

        </button>
      </form>

      {
      (!isFirstTime && !isLoading) && (
        <>
          <h2>
            { `Resultado de álbuns de: ${searchTerm}`}
          </h2>
          <AlbumCard albunsData={ albunsData } />
        </>)
      }
    </>

  );
}

export default Search;
