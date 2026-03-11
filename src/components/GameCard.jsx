import React from 'react';
import { BookOpen } from 'lucide-react';

export const GameCard = ({ game, onClick }) => {
  return (
    <div 
      id={`game-card-${game.id}`}
      className="group relative bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => onClick(game)}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
            {game.category}
          </span>
        </div>
        <h3 className="font-serif font-bold text-xl text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
          {game.title}
        </h3>
        <div className="mt-4 flex items-center text-sm font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">
          <span>Launch Module</span>
          <BookOpen size={16} className="ml-2" />
        </div>
      </div>
    </div>
  );
};
