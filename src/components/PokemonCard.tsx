import { Pokemon } from '../PokemonType';

interface PokemonCardProps {
  pokemon: Pokemon | null;
  description: string | null;
}

function PokemonCard({ pokemon, description }: PokemonCardProps) {
  if (!pokemon) return null;
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '16px',  display: 'inline-block'}}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      {pokemon && <p>{pokemon.name}</p>}
      {pokemon && <p>Height: {pokemon.height}</p>}
      {pokemon && <p>Weight: {pokemon.weight}</p>}

      <p>Tipo:</p>
      <ul style={{ paddingLeft: '20px', margin: '8px 0', textAlign: 'left', display: 'inline-block' }}>
          {pokemon.types.map((t) => (
              <li key={t.type.name}>{t.type.name}</li>
           ))}
      </ul>

      {description && <p>{description}</p>}


    </div>
  );
}

export default PokemonCard;