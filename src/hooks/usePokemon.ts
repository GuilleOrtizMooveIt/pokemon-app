import { useState } from 'react';
import { Pokemon, PokemonSpecies } from '../PokemonType';
import { useCallback } from 'react';

function usePokemon(name: string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = useCallback( async () => {
  	setLoading(true);// todo add reducer
  	setPokemon(null);
    setDescription(null);
    setError(null);
    try {

       const [pokemonRes, speciesRes] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      ]);

      if (!pokemonRes.ok || !speciesRes.ok) {
        throw new Error('Pokemon no encontrado');
      }

      const pokemonData: Pokemon = await pokemonRes.json();
      const speciesData: PokemonSpecies = await speciesRes.json();

      const spanishData = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === 'es'
       );

      setPokemon(pokemonData);
      setDescription(spanishData ? spanishData.flavor_text : null);

    } catch (err) {

        setError('Error en la busqueda: ' + err);
    	setPokemon(null);
    	setDescription(null);

    } finally {

    	setLoading(false);

    }
  }, [name]);

  return { pokemon, description, loading, error, fetchPokemon };
}

export default usePokemon;