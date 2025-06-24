import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FilmService } from "../core/service/getFilms";
import { App } from "../App";
import userEvent from "@testing-library/user-event";

const mockFilms = [
  { id: 1, title: "Interstellar", year: 2014 },
  { id: 2, title: "Inception", year: 2010 },
  { id: 3, title: "Interest in AI", year: 2023 },
];

vi.mock("../core/service/getFilms", () => {
  return {
    FilmService: vi.fn().mockImplementation(() => {
      return {
        getAllFilms: vi.fn().mockResolvedValue(mockFilms),
      };
    }),
  };
});

describe("App Component", () => {
  beforeEach(() => {
    FilmService.mockClear();
  });

  it("displays the subtitle", () => {
    render(<App />);
    const subtitle = screen.getByText(/encuentra tu película favorita/i);
    expect(subtitle).toBeInTheDocument();
  });

  it("muestra el título de la película varias veces", async () => {
    render(<App />);
    await waitFor(() => {
      const titles = screen.getAllByText("Interstellar");
      expect(titles.length).toBeGreaterThanOrEqual(1);
      titles.forEach((title) => expect(title).toBeInTheDocument());
    });
  });

  it("filtra las películas que coinciden con el término de búsqueda y pueden aparecer varias veces", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Buscar películas por título...");

    await userEvent.type(input, "inter");

    await waitFor(() => {
      const interstellarMatches = screen.getAllByText("Interstellar");
      expect(interstellarMatches.length).toBeGreaterThanOrEqual(1);

      const interestMatches = screen.getAllByText("Interest in AI");
      expect(interestMatches.length).toBeGreaterThanOrEqual(1);

      expect(screen.queryByText("Inception")).not.toBeInTheDocument();
    });
  });
});
