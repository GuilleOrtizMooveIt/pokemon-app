interface SearchBarProps {
  name: string;
  onNameChange: (value: string) => void;
  onSearch: () => void;
}

function SearchBar({ name, onNameChange, onSearch }: SearchBarProps) {
  return (
    <div>
      <input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <button onClick={onSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;