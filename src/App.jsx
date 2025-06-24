import React, { useEffect, useState } from "react";
import "./App.css";
import movies from "./data/movies.json";
import { getFilms } from "./core/service/getFilms";

const Movie = ({ title, year }) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="movie-card">
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">{year}</p>
      </div>
      <button className="like-button" onClick={handleLikeClick} type="button">
        {isLiked ? "❤️" : "🤍"} Me gusta
      </button>
    </div>
  );
};

export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const [films, setFilms] = useState();
  const [filteredFilms, setFilteredFilms] = useState([]);

  const getAllFilms = async () => {
    const films = await getFilms.getAllFilms();
    return films;
  };

  useEffect(() => {
    const fetcDataFilms = async () => {
      const films = await getAllFilms();
      setFilms(films);
    };
    fetcDataFilms();
  }, []);

  const findByName = (films) => {
    return films.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  useEffect(() => {
    if (!films) return;
    const results = films.filter((film) => findByName(film));
    setFilteredFilms(results);
    setFilter(false);
  }, [films, searchTerm]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎬 Movie Search</h1>
        <p className="subtitle">Encuentra tu película favorita</p>
      </header>

      <main className="main-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar películas por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <section>
          {!filter && filteredFilms.length > 0 && (
            <ul className="grid" data-testid="grid">
              {filteredFilms.map((film) => (
                <li key={film.id}>
                  <p>{film.title}</p>
                  <p>{film.year}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        {filteredFilms.map((film) => (
          <Movie key={film.id} title={film.title} year={film.year} />
        ))}

        <div className="placeholder">
          <p>
            📝 <strong>Tu tarea:</strong> Crear un buscador que permita filtrar
            películas por título
          </p>
          <p>
            📊 <strong>Datos disponibles:</strong> {movies.length} películas en
            el archivo movies.json
          </p>
        </div>
      </main>
    </div>
  );
};
