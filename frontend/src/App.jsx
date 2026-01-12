import React, { useState } from 'react';
import { Shield, Search, CheckCircle, AlertTriangle, XCircle, ExternalLink, TrendingUp, DollarSign, MessageCircle, Loader2 } from 'lucide-react';

// --- Component: SearchBar ---
function SearchBar({ url, setUrl, onAnalyze, loading }) {
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
            onChange={(e) => setUrl && setUrl(e.target.value)}
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

// --- Component: ResultCard ---
function ResultCard({ result }) {
  if (!result) return null;

  // Dynamic Styles based on Verdict
  const getTheme = () => {
    switch (result.verdict) {
      case 'RECOMMENDED':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          iconBg: 'bg-green-100',
          Icon: CheckCircle
        };
      case 'CAUTION':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          iconBg: 'bg-yellow-100',
          Icon: AlertTriangle
        };
      default: // AVOID
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          iconBg: 'bg-red-100',
          Icon: XCircle
        };
    }
  };

  const theme = getTheme();
  const Icon = theme.Icon;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
      
      {/* 1. Main Verdict Card */}
      <div className={`p-6 rounded-2xl border-2 shadow-sm ${theme.bg} ${theme.border}`}>
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className={`p-3 rounded-full w-fit ${theme.iconBg} ${theme.text}`}>
            <Icon className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>{result.verdict}</h3>
            <p className="text-slate-700 leading-relaxed font-medium">{result.reasoning}</p>
          </div>
          <div className="bg-white/60 p-4 rounded-xl text-center min-w-[100px] border border-slate-200/50 backdrop-blur-sm">
            <div className={`text-4xl font-black ${theme.text}`}>{result.score}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Credibility Score</div>
          </div>
        </div>
      </div>

      {/* 2. Analysis Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Price Analysis */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
              <DollarSign className="w-4 h-4" />
            </div>
            Value for Money
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {result.price_analysis}
          </p>
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
              <MessageCircle className="w-4 h-4" />
            </div>
            Public Sentiment
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {result.review_summary}
          </p>
        </div>
      </div>

      {/* 3. Alternatives (Only show if not highly recommended) */}
      {result.verdict !== 'RECOMMENDED' && result.alternatives?.length > 0 && (
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-32 bg-blue-600/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
          
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Better Alternatives
          </h3>
          
          <div className="space-y-3 relative z-10">
            {result.alternatives.map((alt, i) => (
              <div key={i} className="flex items-center justify-between bg-white/10 border border-white/5 p-4 rounded-xl hover:bg-white/20 transition-colors group">
                <div>
                  <div className="font-semibold group-hover:text-blue-300 transition-colors">{alt.name}</div>
                  <div className="text-xs text-slate-400">{alt.platform}</div>
                </div>
                <a 
                  href={alt.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-xs bg-white text-slate-900 px-3 py-2 rounded-lg font-bold flex items-center gap-1 hover:bg-blue-50 transition-colors"
                >
                  View Course <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setResult(null);

    // MOCK DATA RESPONSE (For Demo purposes if backend isn't connected)
    // In production, uncomment the fetch block below
    /*
    try {
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) throw new Error("Backend connection failed");
      const data = await response.json();
      setResult(data);
    } catch (error) {
       console.log("Backend offline, using mock data for demo.");
       // Fallback to mock data
       setTimeout(() => {
         setResult({
           score: 85,
           verdict: 'RECOMMENDED',
           reasoning: 'High employer demand for this specific certification.',
           price_analysis: 'Fairly priced compared to similar bootcamps.',
           review_summary: 'Positive sentiment on Reddit, though some say it is intense.',
           alternatives: []
         });
       }, 1500);
    } finally {
      setLoading(false);
    }
    */
   
   // SIMULATED BACKEND CALL (Since we can't hit localhost from this preview)
    setTimeout(() => {
        // Logic to simulate different results based on URL keywords
        if (url.includes('scam') || url.includes('bad')) {
            setResult({
                score: 15,
                verdict: 'AVOID',
                reasoning: 'Detected pattern matches known "pay-to-play" schemes.',
                price_analysis: 'Extremely overpriced ($997) for generic content available for free.',
                review_summary: 'Multiple warnings on Reddit about upsells and no job placement.',
                alternatives: [
                    { name: 'Google Data Analytics Cert', platform: 'Coursera', link: '#' },
                    { name: 'FreeCodeCamp', platform: 'FreeCodeCamp.org', link: '#' }
                ]
            });
        } else {
             setResult({
                score: 92,
                verdict: 'RECOMMENDED',
                reasoning: 'This certification is frequently mentioned in job descriptions for Senior roles.',
                price_analysis: 'Excellent value. Costs $49 but average salary uplift is significant.',
                review_summary: 'Students praise the practical projects and career support.',
                alternatives: []
            });
        }
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      
      {/* Header */}
      <header className="max-w-4xl mx-auto flex items-center justify-between mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-600/20">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Credibility Shield
          </h1>
        </div>
        <div className="text-xs font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
          Powered by Google Cloud
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto">
        <div className="text-center mb-10 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Stop buying <span className="text-blue-600">useless</span> certificates.
          </h2>
          <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
            Our AI analyzes the real market value, student reviews, and recruiter demand before you pay.
          </p>
        </div>

        {/* Components */}
        <SearchBar 
          url={url} 
          setUrl={setUrl} 
          onAnalyze={handleAnalyze} 
          loading={loading} 
        />
        
        <ResultCard result={result} />
        
      </main>
    </div>
  );
}