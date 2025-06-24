export interface Films {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  description: string;
}

export interface FilmsDTO {
  films: Films[];
}
