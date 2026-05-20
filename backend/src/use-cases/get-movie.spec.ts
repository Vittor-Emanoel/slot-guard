import { InMemoryMovieRepository } from "@/repositories/in-memory/in-memory-movie-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateMovieUseCase } from "./create-movie.use-case";
import { GetMovieUseCase } from "./get-movie.use-case";

let movieRepository: InMemoryMovieRepository;
let createMovieUseCase: CreateMovieUseCase;
let sut: GetMovieUseCase;

describe("Get movie - Use case", () => {
  beforeEach(() => {
    movieRepository = new InMemoryMovieRepository();
    createMovieUseCase = new CreateMovieUseCase(movieRepository);
    sut = new GetMovieUseCase(movieRepository);
  });

  it("should be able to get a movie", async () => {
    const { movie: createdMovie } = await createMovieUseCase.execute({
      title: "Dune: Part Two",
      durationInMinutes: 166,
    });

    const { movie } = await sut.execute({
      movieId: createdMovie.id,
    });

    expect(movie).toEqual(
      expect.objectContaining({
        id: createdMovie.id,
        title: "Dune: Part Two",
        durationInMinutes: 166,
      }),
    );
  });

  it("should not be able to get a movie with invalid id", async () => {
    await expect(() =>
      sut.execute({
        movieId: "invalid-movie-id",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
