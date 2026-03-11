import React, { useState, useMemo } from 'react';
import { GameCard } from './components/GameCard';
import { GameModal } from './components/GameModal';
import gamesData from './games.json';
import { Search, BookOpen, GraduationCap, Library, Sparkles, Brain } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(gamesData.map(g => g.category))];

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
              <GraduationCap size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight leading-none text-slate-900">
                Totally<br/>
                <span className="text-indigo-600">Education</span>
              </h1>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10 font-semibold text-sm text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">
              <Library size={16} /> Curriculum
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">
              <Brain size={16} /> Cognitive
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">
              <Sparkles size={16} /> New Modules
            </a>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-6 py-2.5 bg-slate-50 border border-slate-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all w-48 md:w-72 text-sm font-medium"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} />
              <span>Next-Gen Learning Platform</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.1] mb-8">
              Interactive Learning<br/>
              <span className="italic text-slate-400">Without Limits.</span>
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mb-10">
              Explore our curated library of educational simulations, logic puzzles, and cognitive development modules designed for the modern scholar.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-1">
                Explore Curriculum
              </button>
              <button className="px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                View Methodology
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/50 to-transparent -z-10 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl -z-10" />
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">Learning Modules</h3>
            <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">Select a subject to begin</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                    : 'bg-white text-slate-500 border border-slate-100 hover:border-indigo-200 hover:text-indigo-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredGames.length > 0 ? (
            filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GameCard 
                  game={game} 
                  onClick={setSelectedGame} 
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">No modules found</h3>
              <p className="text-slate-400 font-medium">Try adjusting your search or subject filters.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-20 px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                  <GraduationCap size={20} />
                </div>
                <span className="font-serif font-bold text-xl tracking-tight">Totally Education</span>
              </div>
              <p className="text-slate-500 leading-relaxed max-w-sm">
                Empowering students with high-quality interactive simulations and cognitive development tools. Accessible everywhere, for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-6">Resources</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Methodology</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Curriculum Map</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-6">Legal</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-[0.2em]">
              © 2026 Totally Education. All Rights Reserved.
            </div>
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100" />
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100" />
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100" />
            </div>
          </div>
        </div>
      </footer>

      {/* Game Player Modal */}
      <GameModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </div>
  );
}
