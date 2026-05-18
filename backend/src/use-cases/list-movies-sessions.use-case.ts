import { prisma } from "@/lib/prisma";

export class ListMoviesSessionsUseCase {
  async execute() {
    const movieSessions = await prisma.movieSession.findMany();

    return movieSessions;
  }
}
