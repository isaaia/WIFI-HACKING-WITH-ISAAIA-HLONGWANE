
import React, { useState } from 'react';
import { WiFiCommand } from '../types';
import { getAuditInsight, AuditInsight } from '../services/geminiService';

interface CommandCardProps {
  command: WiFiCommand;
}

const CommandCard: React.FC<CommandCardProps> = ({ command }) => {
  const [insight, setInsight] = useState<AuditInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInsight, setShowInsight] = useState(false);

  const fetchInsight = async () => {
    if (insight) {
      setShowInsight(!showInsight);
      return;
    }
    setLoading(true);
    const data = await getAuditInsight(command.syntax);
    setInsight(data);
    setLoading(false);
    setShowInsight(true);
  };

  const getDangerColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      default: return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple alert for feedback
    const originalText = document.getElementById(`copy-${command.id}`)?.innerText;
    if (document.getElementById(`copy-${command.id}`)) {
      document.getElementById(`copy-${command.id}`)!.innerText = "COPIED!";
      setTimeout(() => {
        if (document.getElementById(`copy-${command.id}`)) {
          document.getElementById(`copy-${command.id}`)!.innerText = originalText || "COPY";
        }
      }, 1000);
    }
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all group flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-mono font-medium text-cyan-400 px-2 py-1 bg-cyan-400/10 rounded uppercase">
            {command.tool}
          </span>
          <span className={`text-[10px] font-bold px-2 py-1 rounded border ${getDangerColor(command.dangerLevel)}`}>
            {command.dangerLevel} RISK
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
          {command.name}
        </h3>
        
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          {command.description}
        </p>

        <div className="relative mb-4">
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-cyan-300 border border-slate-800 break-all">
            {command.syntax}
          </div>
          <button 
            id={`copy-${command.id}`}
            onClick={() => copyToClipboard(command.syntax)}
            className="absolute right-2 top-2 px-2 py-1 bg-slate-800 text-[10px] font-bold text-slate-400 rounded hover:text-white transition-colors border border-slate-700"
          >
            COPY
          </button>
        </div>
      </div>

      <div className="bg-slate-900/50 p-4 border-t border-slate-700/30">
        <button 
          onClick={fetchInsight}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          {loading ? (
            <><i className="fas fa-spinner fa-spin"></i> ANALYZING...</>
          ) : (
            <><i className="fas fa-brain"></i> {showInsight ? 'HIDE AI INSIGHTS' : 'GET AI SECURITY ANALYSIS'}</>
          )}
        </button>

        {showInsight && insight && (
          <div className="mt-4 p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Expert Analysis</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-500">Sec Score:</span>
                <span className={`text-xs font-bold ${insight.securityScore > 70 ? 'text-emerald-400' : insight.securityScore > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {insight.securityScore}/100
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Impact</p>
                <p className="text-xs text-slate-300 leading-relaxed">{insight.vulnerability}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Defensive Posture</p>
                <p className="text-xs text-slate-300 leading-relaxed italic">{insight.recommendation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandCard;
