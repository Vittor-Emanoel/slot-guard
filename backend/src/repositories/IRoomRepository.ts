import { Prisma, Room } from "generated/prisma/client";

export interface IRoomRepository {
  create(data: Prisma.RoomCreateInput): Promise<Room>;
  findMany(): Promise<Room[]>;
  findById(id: string): Promise<Room | null>;
  findByName(name: string): Promise<Room | null>;
}
