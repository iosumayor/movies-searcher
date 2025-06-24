import React, { useEffect, useState } from "react";
import "./App.css";
import movies from "./data/movies.json";
import { getFilms } from "./service/getFilms";

const Movie = ({ title, year }) => {
  return (
    <div className="movie-card">
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">{year}</p>
      </div>
    </div>
  );
};

export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [films, setFilms] = useState([]);

  const getAllFilms = async () => {
    const films = getFilms();
    return films;
  };

  useEffect(() => {
    const fetcDataFilms = async () => {
      const films = await getAllFilms();
      setFilms(films);
      console.log(films);
    };
    fetcDataFilms();
  }, []);

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

        <section></section>

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
