import React from 'react';

// Kita tambah props baru: onEdit dan onDelete
const MovieCard = ({ movie, onEdit, onDelete }) => {
  return (
    <div className="relative group cursor-pointer mr-4 min-w-[200px]">
      {/* Gambar Poster */}
      <div className="overflow-hidden rounded-lg relative">
        <img 
          src={movie.image} 
          alt={movie.title} 
          className="w-full h-[300px] object-cover transform group-hover:scale-110 transition duration-500" 
        />
        
        {/* Tombol Action (Akan muncul saat di-hover) */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
            <button 
                onClick={() => onEdit(movie)}
                className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 w-3/4"
            >
                Edit Judul
            </button>
            <button 
                onClick={() => onDelete(movie.id)}
                className="bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700 w-3/4"
            >
                Hapus
            </button>
        </div>
      </div>
      
      {/* Judul */}
      <div className="mt-3">
        <h3 className="text-white font-semibold text-lg truncate">{movie.title}</h3>
        <p className="text-gray-400 text-xs mt-1">{movie.tag || 'Movie'}</p>
      </div>
    </div>
  );
};

export default MovieCard;