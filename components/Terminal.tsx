
import React, { useState, useEffect } from 'react';
import { Scenario, ScenarioStep } from '../types';
import { getScenarioExplanation } from '../services/geminiService';

interface TerminalProps {
  scenario: Scenario;
}

const Terminal: React.FC<TerminalProps> = ({ scenario }) => {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExp = async () => {
      setLoading(true);
      const res = await getScenarioExplanation(scenario.title);
      setExplanation(res);
      setLoading(false);
    };
    fetchExp();
  }, [scenario]);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden glow-cyan">
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
        </div>
        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
          <i className="fas fa-lock"></i>
          SECURE_TERMINAL - {scenario.id}.sh
        </div>
        <div className="w-12"></div>
      </div>

      <div className="p-8 font-mono text-sm max-h-[70vh] overflow-y-auto scrollbar-hide">
        <div className="mb-8">
          <h2 className="text-cyan-400 text-xl font-bold mb-2"># {scenario.title}</h2>
          <p className="text-slate-500 italic mb-4"># {scenario.description}</p>
        </div>

        <div className="space-y-8">
          {scenario.steps.map((step, idx) => (
            <div key={idx} className="relative pl-8 border-l border-slate-800">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-cyan-500 border-2 border-slate-900"></div>
              <p className="text-slate-100 font-bold mb-1">{step.title}</p>
              <p className="text-slate-500 text-xs mb-3 italic"># {step.explanation}</p>
              <div className="bg-black/40 p-3 rounded border border-slate-800 text-cyan-500">
                <span className="text-emerald-500 mr-2">root@kali:~#</span>
                {step.command}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-2 text-purple-400 mb-4">
            <i className="fas fa-microchip"></i>
            <span className="font-bold text-xs uppercase tracking-tighter">AI Forensics Deep Dive</span>
          </div>
          
          {loading ? (
            <div className="flex items-center gap-3 text-slate-500 text-xs">
              <i className="fas fa-circle-notch fa-spin"></i>
              Calculating attack vectors...
            </div>
          ) : (
            <div className="text-slate-400 text-xs leading-relaxed whitespace-pre-wrap bg-slate-800/20 p-6 rounded-lg border border-slate-700/30">
              {explanation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
