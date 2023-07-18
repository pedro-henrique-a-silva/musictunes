import React, { useState } from 'react';
import Loading from '../Loading/Loading';
import AlbumCard from '../AlbumCard/AlbumCard';

import searchAlbumsAPI from '../../services/searchAlbumsAPI';

import './Search.css';

import { AlbumType } from '../../types';

type SearchProp = {
  albunsData: AlbumType[],
  updateAlbunsList: (albuns: AlbumType[]) => void
};

function Search(props: SearchProp) {
  const [searchInfo, setSearchData] = useState({ input: '', searchTerm: '' });
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { albunsData, updateAlbunsList } = props;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchData({ ...searchInfo, input: '' });
    setIsLoading(true);
    const albuns = await searchAlbumsAPI(searchInfo.searchTerm);
    updateAlbunsList(albuns);
    setIsLoading(false);
    setIsFirstTime(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchData({ input: value, searchTerm: value });
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
          value={ searchInfo.input }
          onChange={ handleChange }
        />
        <button
          className="form-button search-button"
          data-testid="search-artist-button"
          disabled={ (searchInfo.input.length < 2) }
        >
          Pesquisar

        </button>
      </form>

      {
      (!isFirstTime && !isLoading) && (
        <>
          <h2>{`Resultado de álbuns de: ${searchInfo.searchTerm}`}</h2>
          <AlbumCard albunsData={ albunsData } />
        </>)
      }
    </>

  );
}

export default Search;
