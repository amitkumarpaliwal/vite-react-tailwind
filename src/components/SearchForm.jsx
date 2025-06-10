import React, { useRef, useEffect } from 'react'

export default function SearchForm({search, setSearch, handleSearch}) {
    const inputRef = useRef(null);

    const onSearch = (e) => {
        e.preventDefault();
        if (search.trim() === '') {
            return;
        }
        handleSearch(search);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
    <form onSubmit={onSearch} className="flex items-center space-x-2">
      <input
        ref={inputRef}
        value={search}
        onInput={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search meals..."
        className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        type="submit"
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  )
}
