import { Prisma, Room } from "generated/prisma/client";

export interface IRoomRepository {
  create(data: Prisma.RoomCreateInput): Promise<Room>;
  findMany(): Promise<Room[]>;
  findByName(name: string): Promise<Room | null>;
}
