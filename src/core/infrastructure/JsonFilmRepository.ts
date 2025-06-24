import { FilmsRepository } from "../domain/FilmRepository";
import { Films } from "../domain/Films";
import filmsData from "../../data/movies.json";

export class JsonFilmRepository implements FilmsRepository {
  async getAllFilms(): Promise<Films[]> {
    const films: Films[] = filmsData.map((film: any) => ({
      id: film.id,
      title: film.title,
      director: film.director,
      year: film.year,
      genre: film.genre,
      description: film.description,
    }));

    return films;
  }
}
