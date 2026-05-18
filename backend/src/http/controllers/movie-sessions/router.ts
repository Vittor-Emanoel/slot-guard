import { FastifyInstance } from "fastify";
import { list } from "./list";

export async function movieSessionsRoutes(app: FastifyInstance) {
  app.get("/movie-sessions", list);
}
