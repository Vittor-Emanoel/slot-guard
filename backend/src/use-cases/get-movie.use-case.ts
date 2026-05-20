import { IMovieRepository } from "@/repositories/IMovieRepository";
import { Movie } from "generated/prisma/client";

export class GetMovieUseCase {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute(data: GetMovieUseCase.Input): Promise<GetMovieUseCase.Output> {
    const movie = await this.movieRepository.findById(data.movieId);

    if (!movie) {
      throw new Error("Movie not found.");
    }

    return {
      movie,
    };
  }
}

namespace GetMovieUseCase {
  export type Input = {
    movieId: string;
  };

  export type Output = {
    movie: Movie;
  };
}
