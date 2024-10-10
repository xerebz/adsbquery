import React, { useState } from 'react';
import { Plane } from 'lucide-react';
import QueryForm from './components/QueryForm';
import ResultsDisplay from './components/ResultsDisplay';
import { processQuery } from './utils/queryProcessor';

function App() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleQuery = async (query: string) => {
    setLoading(true);
    try {
      const processedResults = await processQuery(query);
      setResults(processedResults);
    } catch (error) {
      console.error('Error processing query:', error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <Plane className="inline-block text-blue-600 w-12 h-12 mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">ADS-B Query App</h1>
        <p className="text-gray-600">Ask about live flight traffic using plain English</p>
      </header>
      <main className="w-full max-w-2xl">
        <QueryForm onSubmit={handleQuery} />
        <ResultsDisplay results={results} loading={loading} />
      </main>
    </div>
  );
}

export default App;