import type { Movie } from "generated/prisma/client";
import type { IMovieRepository } from "../repositories/IMovieRepository";

export class CreateMovieUseCase {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute(
    data: CreateMovieUseCase.Request,
  ): Promise<CreateMovieUseCase.Response> {
    const alreadyExistsMovie = await this.movieRepository.findByTitle(
      data.title,
    );

    if (alreadyExistsMovie) {
      throw new Error("Movie already exists!");
    }

    const movie = await this.movieRepository.create(data);

    return {
      movie,
    };
  }
}

namespace CreateMovieUseCase {
  export type Request = {
    title: string;
    durationInMinutes: number;
  };

  export type Response = {
    movie: Movie;
  };
}
