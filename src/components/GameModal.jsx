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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white border-4 border-black w-full max-w-6xl h-full max-h-[90vh] flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b-4 border-black bg-emerald-400">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">{game.title}</h2>
              <span className="bg-black text-white px-2 py-0.5 text-xs font-bold uppercase">{game.category}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => window.open(game.url, '_blank')}
                className="p-2 border-2 border-black bg-white hover:bg-gray-100 transition-colors"
                title="Open in new tab"
              >
                <Maximize2 size={20} />
              </button>
              <button 
                onClick={onClose}
                className="p-2 border-2 border-black bg-white hover:bg-red-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 bg-gray-900 relative">
            <iframe 
              src={game.url} 
              className="w-full h-full border-none"
              title={game.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="p-3 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold flex justify-between">
            <span>Playing: {game.title}</span>
            <span className="animate-pulse text-emerald-400">● Live Session</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
