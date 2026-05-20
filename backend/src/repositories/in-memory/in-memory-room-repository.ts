import type { Prisma, Room } from "generated/prisma/client";
import type { IMovieRepository } from "../IMovieRepository";
import { randomUUID } from "node:crypto";
import { IRoomRepository } from "../IRoomRepository";

export class InMemoryRoomRepository implements IRoomRepository {
  public items: Room[] = [];

  async create(data: Prisma.RoomCreateInput): Promise<Room> {
    const room: Room = {
      id: randomUUID(),
      name: data.name,
      rowCount: data.rowCount,
      seatsPerRow: data.seatsPerRow,
      createdAt: new Date(),
    };

    this.items.push(room);

    return room;
  }

  async findMany(): Promise<Room[]> {
    return this.items;
  }

  async findByName(name: string): Promise<Room | null> {
    const room = this.items.find((room) => room.name === name);

    return room ?? null;
  }
}
