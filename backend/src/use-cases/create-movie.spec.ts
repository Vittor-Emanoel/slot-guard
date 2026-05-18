import { beforeEach, describe, expect, it } from "vitest";
import { CreateMovieUseCase } from "./create-movie.use-case";
import { InMemoryMovieRepository } from "@/repositories/in-memory/in-memory-movie-repository";

let movieRepository: InMemoryMovieRepository;
let sut: CreateMovieUseCase;

describe("Create movie - use case", () => {
  beforeEach(async () => {
    movieRepository = new InMemoryMovieRepository();
    sut = new CreateMovieUseCase(movieRepository);
  });

  it("should be able to create movie", async () => {
    const { movie } = await sut.execute({
      title: "A Fantástica Fábrica de Chocolate",
      durationInMinutes: 115,
    });

    expect(movie.id).toEqual(expect.any(String));
  });

  it("should be able to return error when movie already created", async () => {
    await sut.execute({
      title: "A Fantástica Fábrica de Chocolate",
      durationInMinutes: 115,
    });

    await expect(() =>
      sut.execute({
        title: "A Fantástica Fábrica de Chocolate",
        durationInMinutes: 115,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
