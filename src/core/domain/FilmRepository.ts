import { Films } from "./Films";

export interface FilmsRepository {
  getAllFilms: () => Promise<Films[]>;
}
