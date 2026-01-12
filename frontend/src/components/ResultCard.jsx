import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, ExternalLink, TrendingUp, DollarSign, MessageCircle } from 'lucide-react';

export default function ResultCard({ result }) {
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