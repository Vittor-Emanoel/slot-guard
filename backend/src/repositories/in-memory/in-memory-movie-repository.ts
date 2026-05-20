import type { Prisma, Movie } from "generated/prisma/client";
import type { IMovieRepository } from "../IMovieRepository";
import { randomUUID } from "node:crypto";

export class InMemoryMovieRepository implements IMovieRepository {
  public items: Movie[] = [];

  async create(data: Prisma.MovieCreateInput): Promise<Movie> {
    const movie: Movie = {
      id: randomUUID(),
      title: data.title,
      durationInMinutes: data.durationInMinutes,
      createdAt: new Date(),
    };

    this.items.push(movie);

    return movie;
  }

  async findByTitle(title: string): Promise<Movie | null> {
    const movie = this.items.find((movie) => movie.title === title);

    return movie ?? null;
  }

  async findMany(): Promise<Movie[]> {
    return this.items;
  }

  async findById(id: string): Promise<Movie | null> {
    const movie = this.items.find((movie) => movie.id === id);

    return movie ?? null;
  }
}
