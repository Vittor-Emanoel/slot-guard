import type { Prisma, Movie } from "generated/prisma/client";

export interface IMovieRepository {
  create(data: Prisma.MovieCreateInput): Promise<Movie>;
  findByTitle(title: string): Promise<Movie | null>;
}
