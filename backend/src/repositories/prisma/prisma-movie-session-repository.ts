import { MovieSession, Prisma } from "generated/prisma/client";
import { IMovieSessionsRepository } from "../IMovieSessionsRepository";

export class PrismaMovieSessionRepository implements IMovieSessionsRepository {
  async create(data: Prisma.MovieCreateInput): Promise<void> {}
}
