import React from 'react';

const ResultDisplay = ({ rewrittenText, isLoading, error }) => {
  return (
    <div className="mt-8 p-4 bg-gray-700 rounded-lg shadow-inner">
      <h2 className="text-xl font-semibold text-white mb-4">Rewritten Text</h2>
      {isLoading && (
        <div className="text-center text-gray-300">
          <p>Rewriting your text with AI...</p>
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8 mx-auto mt-4"></div>
        </div>
      )}
      {error && (
        <div className="text-red-400 p-3 bg-red-900 rounded-md">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
          <p className="text-sm mt-2">Please check your API key, ensure the text is not too long, or try again later.</p>
        </div>
      )}
      {rewrittenText && !isLoading && !error && (
        <p className="text-gray-200 whitespace-pre-wrap font-mono">{rewrittenText}</p>
      )}
      {!rewrittenText && !isLoading && !error && (
        <p className="text-gray-400">Your rewritten text will appear here.</p>
      )}
    </div>
  );
};

export default ResultDisplay;
