import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import Button from '../components/Button';
import alicePoster from '../assets/alice.png';

const Home = () => {
  // --- STATE & LOGIKA ---
  const [movies, setMovies] = useState([
    { id: 1, title: 'Alice in Borderland', image: alicePoster, tag: 'Top 10' },
    { id: 2, title: 'The Last of Us', image: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', tag: 'Trending' },
    { id: 3, title: 'Stranger Things', image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', tag: 'New' },
    { id: 4, title: 'Avengers: Endgame', image: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', tag: 'Action' },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        setNewImage(URL.createObjectURL(file));
    }
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (newTitle === "" || newImage === null) return alert("Judul dan Gambar wajib diisi!");
    
    setMovies([{
        id: Date.now(),
        title: newTitle,
        image: newImage,
        tag: 'Baru Ditambah'
    }, ...movies]); 
    
    setNewTitle(""); 
    setNewImage(null);
    document.getElementById('fileInput').value = "";
  };

  const handleDeleteMovie = (id) => {
    if (window.confirm("Yakin ingin menghapus film ini?")) {
        setMovies(movies.filter((movie) => movie.id !== id));
    }
  };

  const handleEditMovie = (movie) => {
    const newTitleInput = prompt("Ganti judul film:", movie.title);
    if (newTitleInput) {
        setMovies(movies.map((item) => item.id === movie.id ? { ...item, title: newTitleInput } : item));
    }
  };

  return (
    <div className="bg-[#181818] min-h-screen text-white overflow-x-hidden">
      
      {/* --- NAVBAR (Absolute & Transparent) --- */}
      {/* Navbar menempel di atas gambar (absolute) tanpa warna background */}
      <nav className="flex justify-between items-center px-8 py-4 absolute top-0 left-0 w-full z-50 bg-transparent">
        
        {/* KIRI: Logo */}
        <div className="text-3xl font-extrabold text-red-600 cursor-pointer">
            CHILL
        </div>

        {/* KANAN: Menu & Avatar */}
        <div className="flex items-center gap-8">
            <ul className="hidden md:flex gap-6 text-gray-300 text-sm font-medium">
                <li className="hover:text-white cursor-pointer transition">Series</li>
                <li className="hover:text-white cursor-pointer transition">Film</li>
                <li className="hover:text-white cursor-pointer transition">Daftar Saya</li>
            </ul>

            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600 cursor-pointer hover:border-white transition">
                <img 
                    src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" 
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
      </nav>

      {/* --- HERO SECTION (GAMBAR UTAMA) --- */}
      {/* PERUBAHAN PENTING:
          1. 'bg-top': Memaksa gambar menempel ke sisi atas (tidak terpotong kepalanya).
          2. 'h-[85vh]': Membuat gambar lebih tinggi/panjang ke bawah.
      */}
      <header className="relative h-[85vh] flex items-center bg-[url('https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg')] bg-cover bg-top">
        
        {/* Gradient Overlay (Agar tulisan CHILL di atas tetap terbaca jelas) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/50"></div>
        
        <div className="container mx-auto px-8 relative z-10 pt-20">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">The Last of Us</h1>
            <p className="text-lg mb-6 max-w-xl text-gray-200 drop-shadow-md">
                Wabah jamur menghancurkan dunia. Joel harus melindungi Ellie dalam perjalanan melintasi Amerika yang berbahaya.
            </p>
            <Button text="Mulai Nonton" variant="primary" className="w-fit shadow-xl" />
        </div>
      </header>

      {/* --- KONTEN BAWAH (Form & List) --- */}
      <section className="container mx-auto px-8 py-10 pb-20 relative z-20 -mt-10">
        
        {/* Form Upload */}
        <div className="mb-12 p-6 bg-gray-900/90 backdrop-blur rounded-xl border border-gray-700 max-w-lg shadow-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                🎥 Upload Film Sendiri
            </h3>
            <form onSubmit={handleAddMovie} className="flex flex-col gap-4">
                <input 
                    type="text" 
                    placeholder="Masukkan judul film..." 
                    className="bg-black/50 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 outline-none transition"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">Pilih Poster (Dari Laptop):</label>
                    <input 
                        id="fileInput"
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"
                    />
                </div>

                {newImage && (
                    <div className="w-full h-48 overflow-hidden rounded-md border border-gray-600 mt-2 bg-black">
                        <img src={newImage} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                )}

                <button type="submit" className="bg-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-700 mt-2 transition shadow-md">
                    Tambah Ke Daftar
                </button>
            </form>
        </div>

        {/* Daftar Film */}
        <h2 className="text-2xl font-bold mb-6 drop-shadow-md">Daftar Film Kamu ({movies.length})</h2>
        
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
      </section>
      
    </div>
  );
};

export default Home;