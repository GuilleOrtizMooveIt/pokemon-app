import { memo } from 'react';
import { Pokemon } from '../PokemonType';

interface StatListProps {
  stats: Pokemon['stats'];
}

function StatList({ stats }: StatListProps) {
  return (
    <div>
    <p  style={{ textAlign: 'left' }}>Estadisticas:</p>
    <ul style={{ paddingLeft: '20px', margin: '8px 0', textAlign: 'left', display: 'inline-block' }}>
      {stats.map((s) => (
        <li key={s.stat.name}>
          {s.stat.name}: {s.base_stat}
        </li>
      ))}
    </ul>
    </div>
  );
}

export default memo(StatList);