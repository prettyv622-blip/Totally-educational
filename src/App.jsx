import React, { useState, useMemo } from 'react';
import { GameCard } from './components/GameCard';
import { GameModal } from './components/GameModal';
import gamesData from './games.json';
import { Search, Gamepad2, Trophy, Ghost, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-[#E4E3E0] text-black font-sans selection:bg-emerald-400">
      {/* Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-black p-2 rounded-sm rotate-[-4deg]">
              <Gamepad2 className="text-emerald-400" size={32} />
            </div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
              Unblocked<br/>
              <span className="text-emerald-500">Games Hub</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 font-bold uppercase text-sm tracking-widest">
            <a href="#" className="hover:text-emerald-500 transition-colors flex items-center gap-2">
              <Trophy size={16} /> Leaderboard
            </a>
            <a href="#" className="hover:text-emerald-500 transition-colors flex items-center gap-2">
              <Ghost size={16} /> Random
            </a>
            <a href="#" className="hover:text-emerald-500 transition-colors flex items-center gap-2">
              <Zap size={16} /> New
            </a>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border-2 border-black bg-white focus:outline-none focus:ring-0 focus:bg-emerald-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-[1px] focus:translate-y-[1px] transition-all w-48 md:w-64 font-bold"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-emerald-400 border-b-4 border-black py-12 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="max-w-2xl"
          >
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-6">
              Play Anything<br/>
              Anywhere.
            </h2>
            <p className="text-xl font-bold max-w-md border-l-4 border-black pl-4 mb-8">
              The ultimate collection of unblocked games for school, work, or just killing time. No downloads, no BS.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
          <Gamepad2 size={400} strokeWidth={4} />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 border-2 border-black font-black uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
                activeCategory === cat ? 'bg-black text-white' : 'bg-white hover:bg-emerald-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
            <div className="col-span-full py-20 text-center">
              <Ghost size={64} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-2xl font-black uppercase italic">No games found...</h3>
              <p className="font-bold text-gray-500">Try searching for something else!</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-black p-1 rounded-sm">
              <Gamepad2 className="text-emerald-400" size={24} />
            </div>
            <span className="font-black uppercase italic tracking-tighter text-xl">Unblocked Hub</span>
          </div>
          
          <div className="flex gap-8 font-bold uppercase text-xs tracking-[0.2em]">
            <a href="#" className="hover:underline underline-offset-4">Privacy</a>
            <a href="#" className="hover:underline underline-offset-4">Terms</a>
            <a href="#" className="hover:underline underline-offset-4">Contact</a>
            <a href="#" className="hover:underline underline-offset-4">DMCA</a>
          </div>

          <div className="text-[10px] uppercase font-bold text-gray-400">
            © 2026 Unblocked Games Hub. All Rights Reserved.
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
