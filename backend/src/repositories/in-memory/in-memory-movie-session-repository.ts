import { MovieSession } from "generated/prisma/browser";
import { IMovieSessionsRepository } from "../IMovieSessionsRepository";

export class InMemoryMovieSessionRepository
  implements IMovieSessionsRepository
{
  async create(data: MovieSession): Promise<void> {}
}
