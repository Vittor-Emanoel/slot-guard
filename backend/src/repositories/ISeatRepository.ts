import { Prisma, Seat } from "generated/prisma/client";

export interface ISeatRepository {
  findManyByRoomId(roomId: string): Promise<Seat[]>;
  createMany(seats: Prisma.SeatCreateManyInput[]): Promise<Seat[]>;
}
