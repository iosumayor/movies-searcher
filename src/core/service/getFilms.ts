import { FilmsRepository } from "../domain/FilmRepository";
import { Films } from "../domain/Films";

export class FilmService {
  constructor(private filmRepository: FilmsRepository) {}

  async getAllFilms(): Promise<Films[]> {
    return this.filmRepository.getAllFilms();
  }
}
