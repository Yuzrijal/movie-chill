import React from 'react';
import MovieCard from '../components/MovieCard';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import alicePoster from '../assets/alice.png';

const Home = () => {
  const trendingMovies = [
    { 
      id: 1, 
      title: 'Alice in Borderland', 
      image: alicePoster, 
      tag: 'Top 10' 
    },    
    { id: 2, title: 'The Last of Us', image: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', tag: 'Trending' },
    { id: 3, title: 'Stranger Things', image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', tag: 'New' },
    { id: 4, title: 'Avengers: Endgame', image: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', tag: 'Action' },
    { id: 5, title: 'Spider-Man', image: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', tag: 'Superhero' },
  ];

  return (
    <div className="bg-[#181818] min-h-screen text-white overflow-x-hidden">
      
      <nav className="absolute top-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="text-3xl font-extrabold text-red-600 tracking-wider">CHILL</div>
        <div className="space-x-4 flex items-center">
            <span className="cursor-pointer hover:text-red-500">Series</span>
            <span className="cursor-pointer hover:text-red-500">Film</span>
            <span className="cursor-pointer hover:text-red-500">Daftar Saya</span>
            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden border-2 border-white ml-4">
                <img src="https://i.pravatar.cc/150?img=12" alt="Avatar" />
            </div>
        </div>
      </nav>

      {}
      <header className="relative h-[85vh] flex items-center bg-[url('https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg')] bg-cover bg-center">
        {}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/40"></div>
        
        <div className="container mx-auto px-8 relative z-10 pt-20">
            <h1 className="text-6xl font-extrabold mb-4 max-w-2xl drop-shadow-lg">The Last of Us</h1>
            <p className="text-lg mb-8 max-w-xl text-gray-200 drop-shadow-md leading-relaxed">
                Sebuah wabah jamur telah menghancurkan dunia. Joel, seorang penyintas tangguh, disewa untuk menyelundupkan Ellie keluar dari zona karantina yang menindas.
            </p>
            <div className="flex gap-4">
                <Button text="Mulai Nonton" variant="primary" className="px-10" />
                <Button text="Selengkapnya" variant="secondary" />
            </div>
        </div>
      </header>

      <section className="container mx-auto px-8 py-10 -mt-20 relative z-20">
        <h2 className="text-2xl font-bold mb-6 text-white">Sedang Tren Hari Ini</h2>
        
        <div className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide">
            {trendingMovies.map((movie) => (
                <MovieCard key={movie.id} title={movie.title} image={movie.image} tag={movie.tag} />
            ))}
        </div>
      </section>
      
      <footer className="py-8 text-center text-gray-500 border-t border-gray-800">
        <p>&copy; 2023 Chill Movie App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;