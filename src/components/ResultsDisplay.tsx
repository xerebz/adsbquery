import React from 'react';
import { Loader } from 'lucide-react';

interface ResultsDisplayProps {
  results: any[];
  loading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="text-center">
        <Loader className="animate-spin inline-block w-8 h-8 text-blue-600" />
        <p className="mt-2 text-gray-600">Processing your query...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return <p className="text-center text-gray-600">No results to display. Try a query!</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Callsign</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Altitude</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((flight, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{flight.callsign}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flight.origin || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flight.destination || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flight.altitude ? `${flight.altitude} ft` : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsDisplay;