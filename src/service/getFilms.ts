import { Films, FilmsDTO } from "../domain/Films";

import filmsData from "../data/movies.json";

export const getFilms = async (): Promise<FilmsDTO> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (filmsData.length === 0) {
    throw new Error("No products found");
  }
  return { films: filmsData as Films[] };
};
