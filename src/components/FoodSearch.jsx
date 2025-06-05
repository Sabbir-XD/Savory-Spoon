import { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const FoodSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  const handleSearch = (term) => {
    if (term.trim()) {
      onSearch(term);
      // Add to search history if not already there
      if (!searchHistory.includes(term)) {
        setSearchHistory(prev => [term, ...prev].slice(0, 5));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear any pending timeout and search immediately
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    handleSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout to trigger search after 500ms of inactivity
    if (value.trim()) {
      setTypingTimeout(
        setTimeout(() => {
          handleSearch(value);
        }, 500)
      );
    } else {
      // If input is empty, clear search immediately
      onSearch('');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-8 mb-8">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for any food... (e.g., pizza, burger, salad)"
            className="w-full pl-12 pr-10 py-3 border-2 border-amber-200 rounded-full focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 shadow-lg transition-all duration-300 hover:shadow-amber-100/50"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 text-xl" />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"
            >
              <FiX className="text-lg" />
            </button>
          )}
        </div>

        {/* Search tips */}
        <p className="text-center text-sm text-gray-500 mt-3">
          Tip: Search multiple words like "chicken pasta" or try single ingredients like "chicken"
        </p>
      </form>
    </div>
  );
};

export default FoodSearch;