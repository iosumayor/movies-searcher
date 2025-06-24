import React, { useEffect, useState } from "react";
import "./App.css";
import { Movie } from "./_components/Movie";
import movies from "./data/movies.json";
import { JsonFilmRepository } from "./core/infrastructure/JsonFilmRepository";
import { FilmService } from "./core/service/getFilms";

export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);

  const getAllFilms = async () => {
    const newFilmService = new FilmService(new JsonFilmRepository());
    const films = await newFilmService.getAllFilms();
    return films;
  };

  useEffect(() => {
    const fetchDataFilms = async () => {
      const allFilms = await getAllFilms();
      setFilms(allFilms);
    };
    fetchDataFilms();
  }, []);

  const findByName = (film) => {
    return film.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  useEffect(() => {
    if (!films.length) return;
    const results = films.filter(findByName);
    setFilteredFilms(results);
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
          {filteredFilms.length > 0 && (
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
