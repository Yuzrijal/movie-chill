import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import MovieCard from '../components/MovieCard';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState(null);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/movies');
        setMovies(response.data); 
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        setNewImage(URL.createObjectURL(file));
    }
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (newTitle === "" || newImage === null) return alert("Judul dan Gambar wajib diisi!");

    const newMovie = {
        title: newTitle,
        image: newImage,
        tag: 'Baru Ditambah'
    };

    try {
        const response = await axios.post('http://localhost:3001/movies', newMovie);
        
        setMovies([...movies, response.data]); 
        
        setNewTitle(""); 
        setNewImage(null);
        document.getElementById('fileInput').value = "";
    } catch (error) {
        console.error("Gagal menambah film:", error);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (window.confirm("Yakin ingin menghapus film ini?")) {
        try {
            await axios.delete(`http://localhost:3001/movies/${id}`);
            
            setMovies(movies.filter((movie) => movie.id !== id));
        } catch (error) {
            console.error("Gagal menghapus film:", error);
        }
    }
  };

  const handleEditMovie = async (movie) => {
    const newTitleInput = prompt("Ganti judul film:", movie.title);
    if (newTitleInput) {
        try {
            await axios.patch(`http://localhost:3001/movies/${movie.id}`, {
                title: newTitleInput
            });

            setMovies(movies.map((item) => item.id === movie.id ? { ...item, title: newTitleInput } : item));
        } catch (error) {
            console.error("Gagal mengupdate film:", error);
        }
    }
  };

  return (
    <div className="bg-[#181818] min-h-screen text-white overflow-x-hidden">
      
      <nav className="flex justify-between items-center px-8 py-4 absolute top-0 left-0 w-full z-50 bg-transparent">
        <div className="text-3xl font-extrabold text-red-600 cursor-pointer">
            <Link to="/">CHILL</Link>
        </div>
        <div className="flex items-center gap-8">
            <ul className="hidden md:flex gap-6 text-gray-300 text-sm font-medium">
                <li className="hover:text-white transition"><Link to="/series">Series</Link></li>
                <li className="hover:text-white transition"><Link to="/film">Film</Link></li>
                <li className="hover:text-white transition"><Link to="/daftar-saya">Daftar Saya</Link></li>
            </ul>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600 cursor-pointer hover:border-white transition">
                <img src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" alt="User Avatar" className="w-full h-full object-cover"/>
            </div>
        </div>
      </nav>

      <header className="relative h-[85vh] flex items-center bg-[url('https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg')] bg-cover bg-top">
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/50"></div>
        <div className="container mx-auto px-8 relative z-10 pt-20">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">The Last of Us</h1>
            <p className="text-lg mb-6 max-w-xl text-gray-200 drop-shadow-md">
                Wabah jamur menghancurkan dunia. Joel harus melindungi Ellie dalam perjalanan melintasi Amerika yang berbahaya.
            </p>
            <Button text="Mulai Nonton" variant="primary" className="w-fit shadow-xl" />
        </div>
      </header>

      <section className="container mx-auto px-8 py-10 pb-20 relative z-20 -mt-10">
        
        <div className="mb-12 p-6 bg-gray-900/90 backdrop-blur rounded-xl border border-gray-700 max-w-lg shadow-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">🎥 Upload Film (via API)</h3>
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
                    <input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"/>
                </div>
                {newImage && (
                    <div className="w-full h-48 overflow-hidden rounded-md border border-gray-600 mt-2 bg-black">
                        <img src={newImage} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                )}
                <button type="submit" className="bg-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-700 mt-2 transition shadow-md">
                    Tambah Ke Server
                </button>
            </form>
        </div>

        <h2 className="text-2xl font-bold mb-6 drop-shadow-md">Daftar Film Kamu ({movies.length})</h2>
        <div className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onEdit={handleEditMovie} onDelete={handleDeleteMovie} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;