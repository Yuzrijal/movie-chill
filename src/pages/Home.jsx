import React, { useState } from 'react'; // Import useState
import MovieCard from '../components/MovieCard';
import Button from '../components/Button';
import alicePoster from '../assets/alice.png'; // Pastikan path ini benar sesuai file kamu

const Home = () => {
  // 1. STATE UNTUK DATA FILM (Read)
  // Data awal kita masukkan ke dalam useState
  const [movies, setMovies] = useState([
    { id: 1, title: 'Alice in Borderland', image: alicePoster, tag: 'Top 10' },
    { id: 2, title: 'The Last of Us', image: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', tag: 'Trending' },
    { id: 3, title: 'Stranger Things', image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', tag: 'New' },
    { id: 4, title: 'Avengers: Endgame', image: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', tag: 'Action' },
  ]);

  // State untuk Form Tambah Film
  const [newTitle, setNewTitle] = useState("");

  // 2. FUNGSI TAMBAH DATA (Create)
  const handleAddMovie = (e) => {
    e.preventDefault();
    if (newTitle === "") return alert("Judul tidak boleh kosong!");

    const newMovie = {
        id: movies.length + 1 + Math.random(), // ID unik acak
        title: newTitle,
        image: 'https://placehold.co/300x450/1e1e1e/white?text=No+Image', // Gambar placeholder
        tag: 'Baru Ditambah'
    };

    setMovies([newMovie, ...movies]); // Masukkan film baru ke paling depan
    setNewTitle(""); // Reset form
  };

  // 3. FUNGSI HAPUS DATA (Delete)
  const handleDeleteMovie = (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus film ini?");
    if (confirmDelete) {
        const updatedMovies = movies.filter((movie) => movie.id !== id);
        setMovies(updatedMovies);
    }
  };

  // 4. FUNGSI EDIT DATA (Update)
  const handleEditMovie = (movie) => {
    const newTitleInput = prompt("Ganti judul film:", movie.title);
    if (newTitleInput) {
        const updatedMovies = movies.map((item) => 
            item.id === movie.id ? { ...item, title: newTitleInput } : item
        );
        setMovies(updatedMovies);
    }
  };

  return (
    <div className="bg-[#181818] min-h-screen text-white overflow-x-hidden pb-20">
      
      {/* Navbar Simple */}
      <nav className="flex justify-between items-center px-8 py-6 bg-black/80 sticky top-0 z-50">
        <div className="text-3xl font-extrabold text-red-600">CHILL</div>
        <div className="text-gray-300">Mission 2: React Interactive</div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[60vh] flex items-center bg-[url('https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/40"></div>
        <div className="container mx-auto px-8 relative z-10 pt-10">
            <h1 className="text-5xl font-extrabold mb-4">The Last of Us</h1>
            <p className="text-lg mb-6 max-w-xl text-gray-200">
                Wabah jamur menghancurkan dunia. Joel harus melindungi Ellie.
            </p>
            <Button text="Mulai Nonton" variant="primary" className="w-fit" />
        </div>
      </header>

      {/* --- AREA INTERAKTIF CRUD --- */}
      <section className="container mx-auto px-8 py-10">
        
        {/* Form Tambah Film (Create) */}
        <div className="mb-10 p-6 bg-gray-800 rounded-xl border border-gray-700 max-w-lg">
            <h3 className="text-xl font-bold mb-4">🎥 Tambah Film Baru</h3>
            <form onSubmit={handleAddMovie} className="flex gap-3">
                <input 
                    type="text" 
                    placeholder="Masukkan judul film..." 
                    className="flex-1 bg-black text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-red-500 outline-none"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <button type="submit" className="bg-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-700">
                    Tambah
                </button>
            </form>
        </div>

        {/* List Film (Read, Update, Delete) */}
        <h2 className="text-2xl font-bold mb-6">Daftar Film Kamu ({movies.length})</h2>
        
        {movies.length === 0 ? (
            <p className="text-gray-500 italic">Belum ada film di daftar tontonanmu.</p>
        ) : (
            <div className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide">
                {movies.map((movie) => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie} 
                        onEdit={handleEditMovie}
                        onDelete={handleDeleteMovie}
                    />
                ))}
            </div>
        )}
      </section>

    </div>
  );
};

export default Home;