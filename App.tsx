
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import CommandCard from './components/CommandCard';
import Terminal from './components/Terminal';
import { WIFI_COMMANDS, SCENARIOS } from './constants';
import { CommandCategory } from './types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CommandCategory | 'All'>('All');
  const [activeTab, setActiveTab] = useState<'commands' | 'scenarios'>('commands');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommands = useMemo(() => {
    return WIFI_COMMANDS.filter(cmd => {
      const matchesCat = activeCategory === 'All' || cmd.category === activeCategory;
      const matchesSearch = cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           cmd.tool.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const statsData = useMemo(() => {
    const counts: Record<string, number> = {};
    WIFI_COMMANDS.forEach(cmd => {
      counts[cmd.category] = (counts[cmd.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const COLORS = ['#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6'];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      <Sidebar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {activeTab === 'commands' ? 'Command Repository' : 'Auditing Scenarios'}
            </h1>
            <p className="text-slate-400">
              {activeTab === 'commands' 
                ? `Exploring ${filteredCommands.length} security auditing tools for Kali Linux`
                : 'Step-by-step methodologies for professional network penetration testing'}
            </p>
          </div>

          {activeTab === 'commands' && (
            <div className="relative w-full md:w-80">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input 
                type="text" 
                placeholder="Search tools or commands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
              />
            </div>
          )}
        </header>

        {activeTab === 'commands' ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map(cmd => (
                    <CommandCard key={cmd.id} command={cmd} />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                    <i className="fas fa-radar text-4xl text-slate-700 mb-4 block"></i>
                    <p className="text-slate-500">No commands found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Database Overview</h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statsData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                        itemStyle={{ color: '#94a3b8', fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {statsData.map((stat, idx) => (
                    <div key={stat.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                      <span className="text-[10px] text-slate-400 font-medium truncate">{stat.name} ({stat.value})</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-gradient-to-br from-cyan-900/20 to-slate-900/50 border border-cyan-500/10 p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <i className="fas fa-lightbulb"></i>
                    </div>
                    <h3 className="font-bold text-slate-100">Pro Auditor Tip</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "Always monitor the CPU temperatures when running GPU-intensive tools like Hashcat. High-speed cracking can thermal throttle your system quickly."
                  </p>
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-4">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Select Scenario</h2>
                {SCENARIOS.map(scenario => (
                  <button 
                    key={scenario.id}
                    className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900 transition-all"
                  >
                    <h4 className="font-bold text-sm text-slate-100 mb-1">{scenario.title}</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-2">{scenario.description}</p>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-3">
                <Terminal scenario={SCENARIOS[0]} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
