import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/shop?query=${query}`); // Redirect to shop page with search query
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="px-4 py-2 border rounded"
      />
      <button type="submit" className="ml-2 text-blue-500">
        Search
      </button>
    </form>
  );
};

export default Search;
