import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma";

export async function list(_: FastifyRequest, reply: FastifyReply) {
  const movieSessions = await prisma.movieSession.findMany();

  return reply.status(200).send(movieSessions);
}
