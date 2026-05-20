import type { Prisma, Movie } from "generated/prisma/client";

export interface IMovieRepository {
  create(data: Prisma.MovieCreateInput): Promise<Movie>;
  findMany(): Promise<Movie[]>;
  findById(id: string): Promise<Movie | null>;
  findByTitle(title: string): Promise<Movie | null>;
}
