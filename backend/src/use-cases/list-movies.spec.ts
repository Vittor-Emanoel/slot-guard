import { beforeEach, describe, expect, it } from "vitest";
import { ListMoviesUseCase } from "./list-movies.use-case";
import { InMemoryMovieRepository } from "@/repositories/in-memory/in-memory-movie-repository";

let movieRepository: InMemoryMovieRepository;
let sut: ListMoviesUseCase;

describe("List Movies UseCase", () => {
  beforeEach(async () => {
    movieRepository = new InMemoryMovieRepository();
    sut = new ListMoviesUseCase(movieRepository);
  });

  it("should be able to list all movies", async () => {
    await movieRepository.create({
      title: "O Senhor dos Anéis",
      durationInMinutes: 200,
    });

    await movieRepository.create({
      title: "A Fantástica Fábrica de Chocolate",
      durationInMinutes: 115,
    });

    const { movies } = await sut.execute();

    expect(movies).toHaveLength(2);
    expect(movies).toEqual([
      expect.objectContaining({ title: "O Senhor dos Anéis" }),
      expect.objectContaining({ title: "A Fantástica Fábrica de Chocolate" }),
    ]);
  });
});
