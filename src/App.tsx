import React, { useState, useEffect } from 'react';
import usePokemon from './hooks/usePokemon';

function App() {

    const [name, setName] = useState('pikachu');
    const { pokemon, fetchPokemon } = usePokemon(name);

    useEffect(() => {
      fetchPokemon();
    }, []);

    return (
      <div>
    
        {pokemon && <img src={pokemon.sprites.front_default} />}
        
      </div>
  );
}

export default App;
