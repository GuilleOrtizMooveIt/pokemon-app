import React, { useState, useEffect } from 'react';
import usePokemon from './hooks/usePokemon';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';

function App() {

    const [name, setName] = useState('');
    const { pokemon, description, loading, error, fetchPokemon } = usePokemon(name);

    return (
      <div style={{ textAlign: 'center', marginTop: '40vh' }} >
    
        <p>Busca un Pokemon</p>
        <br />
        <SearchBar name={name} onNameChange={setName} onSearch={fetchPokemon} />
        <PokemonCard pokemon={pokemon} description={description} />

        <br />
        {loading && <p> Cargando...</p>}
        {error && <p> {error}</p>}
    
      </div>
  );
}

export default App;
