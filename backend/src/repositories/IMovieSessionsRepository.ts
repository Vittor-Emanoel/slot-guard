import type { MovieSession } from "../../generated/prisma/client";

export interface IMovieSessionsRepository {
  create(data: MovieSession): Promise<void>;
}
