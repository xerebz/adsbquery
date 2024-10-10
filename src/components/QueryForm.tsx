import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface QueryFormProps {
  onSubmit: (query: string) => void;
}

const QueryForm: React.FC<QueryFormProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Which planes are over Idaho?"
          className="flex-grow px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default QueryForm;