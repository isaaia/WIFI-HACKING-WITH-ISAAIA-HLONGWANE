
import React from 'react';
import { CommandCategory } from '../types';

interface SidebarProps {
  activeCategory: CommandCategory | 'All';
  setActiveCategory: (cat: CommandCategory | 'All') => void;
  activeTab: 'commands' | 'scenarios';
  setActiveTab: (tab: 'commands' | 'scenarios') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory, activeTab, setActiveTab }) => {
  const categories = ['All', ...Object.values(CommandCategory)];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col p-6 sticky top-0 overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-xl">
          <i className="fas fa-shield-halved"></i>
        </div>
        <div>
          <h1 className="font-bold text-lg text-slate-100 leading-tight">NETGUARD</h1>
          <p className="text-xs text-cyan-400 font-mono tracking-widest">PRO AUDITOR</p>
        </div>
      </div>

      <nav className="flex-1 space-y-8">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">View Mode</p>
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('commands')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-all ${
                activeTab === 'commands' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <i className="fas fa-terminal"></i>
              Command List
            </button>
            <button
              onClick={() => setActiveTab('scenarios')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-all ${
                activeTab === 'scenarios' ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <i className="fas fa-diagram-project"></i>
              Attack Scenarios
            </button>
          </div>
        </div>

        {activeTab === 'commands' && (
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Categories</p>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as CommandCategory | 'All')}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition-all ${
                    activeCategory === cat ? 'bg-slate-800 text-white font-medium border-l-2 border-cyan-500' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="pt-6 border-t border-slate-800">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold mb-2">
            <i className="fas fa-triangle-exclamation"></i>
            ETHICAL WARNING
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed italic">
            This tool is for educational purposes and authorized security auditing only. Never use these commands on networks you do not own or have explicit permission to test.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
