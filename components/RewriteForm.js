import React from 'react';

const moods = [
  { value: 'chill', label: 'Chill' },
  { value: 'professional', label: 'Professional' },
  { value: 'savage', label: 'Savage' },
  { value: 'flirty', label: 'Flirty' },
  { value: 'dramatic', label: 'Dramatic' },
];

const RewriteForm = ({ text, mood, onTextChange, onMoodChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <label htmlFor="originalText" className="block text-gray-200 text-sm font-bold mb-2">
          Original Text
        </label>
        <textarea
          id="originalText"
          className="shadow appearance-none border border-gray-600 rounded w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 resize-y min-h-[120px]"
          placeholder="Enter text to rewrite..."
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          disabled={isLoading}
          rows={6}
        ></textarea>
      </div>

      <div className="mb-6">
        <label htmlFor="moodSelect" className="block text-gray-200 text-sm font-bold mb-2">
          Select Mood
        </label>
        <select
          id="moodSelect"
          className="block appearance-none w-full bg-gray-700 border border-gray-600 text-gray-100 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-blue-500"
          value={mood}
          onChange={(e) => onMoodChange(e.target.value)}
          disabled={isLoading}
        >
          {moods.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Rewriting...' : 'Rewrite Text'}
        </button>
      </div>
    </form>
  );
};

export default RewriteForm;
