import React from 'react';
import { Play } from 'lucide-react';

export const GameCard = ({ game, onClick }) => {
  return (
    <div 
      id={`game-card-${game.id}`}
      className="group relative bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer overflow-hidden"
      onClick={() => onClick(game)}
    >
      <div className="aspect-video overflow-hidden border-b-2 border-black">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-4 flex justify-between items-center">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">{game.category}</span>
          <h3 className="font-bold text-lg leading-tight">{game.title}</h3>
        </div>
        <div className="bg-black text-white p-2 rounded-full group-hover:bg-emerald-500 transition-colors">
          <Play size={18} fill="currentColor" />
        </div>
      </div>
    </div>
  );
};
