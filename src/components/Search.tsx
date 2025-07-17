import React from "react";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onClear?: () => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm, onClear }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Type here to search..."
        className="input input-bordered w-full max-w-xs bg-base-200 text-primary"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {searchTerm && onClear && (
        <button
          className="btn btn-sm btn-outline"
          onClick={onClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Search;
