import React from 'react';
import { X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GameModal = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 rounded-2xl text-white">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">{game.title}</h2>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">{game.category} Module</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => window.open(game.url, '_blank')}
                className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                title="Open in new tab"
              >
                <Maximize2 size={20} />
              </button>
              <button 
                onClick={onClose}
                className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-red-50 text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 bg-slate-50 relative">
            <iframe 
              src={game.url} 
              className="w-full h-full border-none"
              title={game.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="px-6 py-4 bg-white border-t border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Active Learning Session
            </div>
            <div className="text-xs font-medium text-slate-400 italic">
              "Education is the most powerful weapon which you can use to change the world."
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
