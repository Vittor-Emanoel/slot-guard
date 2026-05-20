import { ISeatRepository } from "@/repositories/ISeatRepository";
import { Prisma, Seat } from "generated/prisma/client";
import { randomUUID } from "node:crypto";

export class InMemorySeatRepository implements ISeatRepository {
  public items: Seat[] = [];

  async findManyByRoomId(roomId: string): Promise<Seat[]> {
    return this.items.filter((seat) => seat.roomId === roomId);
  }

  async createMany(seats: Prisma.SeatCreateManyInput[]): Promise<Seat[]> {
    const createdSeats = seats.map((seat) => ({
      id: randomUUID(),
      roomId: seat.roomId,
      rowLabel: seat.rowLabel,
      seatNumber: seat.seatNumber,
      createdAt: new Date(),
    }));

    this.items.push(...createdSeats);

    return createdSeats;
  }
}
