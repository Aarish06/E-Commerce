import { useState, type ChangeEvent } from 'react';
import './searchbar.css'

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
};

const SearchBar = ({ placeholder = 'Search...', onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
