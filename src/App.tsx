import { Routes, Route } from 'react-router-dom';

import Login from './components/Login/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      {/* A rota /search irá renderizar a página de Search. */}
      <Route path="/search" />
      {/* A rota /album/:id irá renderizar a página de Album. */}
      <Route path="/album/:id" />
      {/* A rota /favorites irá renderizar a página de Favorites (bônus). */}
      <Route path="/favorites" />
      {/* A rota /profile irá renderizar a página de Profile (bônus). */}
      <Route path="/profile" />
      {/* A rota /profile/edit irá renderizar a página de ProfileEdit (bônus). */}
      <Route path="/profile/edit" />
      {/* Qualquer outra rota irá renderizar a página de NotFound. */}
      <Route path="*" />
    </Routes>
  );
}

export default App;
