import { useState } from 'react';
import { Pokemon } from '../PokemonType';

function usePokemon(name: string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const fetchPokemon = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setPokemon(data);
    } catch (err) {} 
  };

  return { pokemon, fetchPokemon };
}

export default usePokemon;