import type { Movie } from "generated/prisma/client";
import type { IMovieRepository } from "../IMovieRepository";
import { randomUUID } from "node:crypto";

export class InMemoryMovieRepository implements IMovieRepository {
  public items: Movie[] = [];

  async create(data: Movie): Promise<Movie> {
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
}
