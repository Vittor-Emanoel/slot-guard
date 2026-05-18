import { Movie } from "generated/prisma/client";
import { IMovieRepository } from "../IMovieRepository";
import { prisma } from "@/lib/prisma";

export class PrismaMovieRepository implements IMovieRepository {
  async create(data: Movie): Promise<Movie> {
    const movie = await prisma.movie.create({
      data,
    });

    return movie;
  }

  async findByTitle(title: string): Promise<Movie | null> {
    const movie = await prisma.movie.findUnique({
      where: {
        title,
      },
    });

    return movie;
  }

  async findMany(): Promise<Movie[]> {
    return await prisma.movie.findMany({
      select: {
        id: true,
        title: true,
        durationInMinutes: true,
        createdAt: true,
      },
    });
  }
}
