import React from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function SearchBar({ url, setUrl, onAnalyze, loading }) {
  return (
    <div className="relative mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <form onSubmit={onAnalyze}>
        <div className="relative group">
          {/* Input Field */}
          <input
            type="url"
            required
            placeholder="Paste course URL (LinkedIn, Udemy, Coursera...)"
            className="w-full p-4 pl-12 rounded-xl border border-slate-200 shadow-lg text-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          
          {/* Search Icon */}
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          
          {/* Analyze Button */}
          <button
            type="submit"
            disabled={loading || !url}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-6 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Scanning...</span>
              </>
            ) : (
              "Analyze"
            )}
          </button>
        </div>
      </form>
      
      {/* Helper Text */}
      <p className="text-center text-sm text-slate-400 mt-4">
        We check pricing, authentic reviews, and employer demand.
      </p>
    </div>
  );
}