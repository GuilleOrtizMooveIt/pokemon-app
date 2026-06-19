import React, { useState, useEffect } from 'react';
import usePokemon from './hooks/usePokemon';


function App() {

    const [name, setName] = useState('charmander');
    const { pokemon, description, loading, error, fetchPokemon } = usePokemon(name);

    useEffect(() => {
      fetchPokemon();
    }, []);

    return (
      <div>
        {loading && <p> Cargando...</p>}
        {error && <p> {error}</p>}
    
        {pokemon && <img src={pokemon.sprites.front_default} />}
        {description && <p>{description}</p>}
        
      </div>
  );
}

export default App;
