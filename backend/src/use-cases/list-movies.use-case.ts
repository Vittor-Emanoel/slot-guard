import type { IMovieRepository } from "@/repositories/IMovieRepository";
import type { Movie } from "generated/prisma/client";

export class ListMoviesUseCase {
  constructor(private readonly moviesRepository: IMovieRepository) {}

  async execute(): Promise<ListMoviesUseCase.Reponse> {
    const movies = await this.moviesRepository.findMany();

    return {
      movies,
    };
  }
}

namespace ListMoviesUseCase {
  export type Reponse = {
    movies: Movie[];
  };
}
