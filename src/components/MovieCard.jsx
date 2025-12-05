import React from 'react';

const MovieCard = ({ title, image, tag }) => {
  return (
    <div className="relative group cursor-pointer mr-4 min-w-[200px]">
      <div className="overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-[300px] object-cover transform group-hover:scale-110 transition duration-500" 
        />
      </div>
      
      <div className="mt-3">
        <h3 className="text-white font-semibold text-lg truncate">{title}</h3>
        {tag && <p className="text-gray-400 text-xs mt-1">{tag}</p>}
      </div>
    </div>
  );
};

export default MovieCard;