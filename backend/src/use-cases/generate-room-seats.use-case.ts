import { IRoomRepository } from "@/repositories/IRoomRepository";
import { ISeatRepository } from "@/repositories/ISeatRepository";
import { Prisma, Seat } from "generated/prisma/client";

export class GenerateRoomSeatsUseCase {
  constructor(
    private readonly roomRepository: IRoomRepository,
    private readonly seatRepository: ISeatRepository,
  ) {}

  async execute({
    roomId,
  }: GenerateRoomSeatsUseCase.Input): Promise<GenerateRoomSeatsUseCase.Output> {
    const room = await this.roomRepository.findById(roomId);

    if (!room) {
      throw new Error("Room not found.");
    }

    const existingSeats = await this.seatRepository.findManyByRoomId(roomId);

    if (existingSeats.length > 0) {
      throw new Error("Room already has seats.");
    }

    const seatsToCreate = this.createSeatsForRoom({
      roomId: room.id,
      rowCount: room.rowCount,
      seatsPerRow: room.seatsPerRow,
    });

    const seats = await this.seatRepository.createMany(seatsToCreate);

    return {
      seats,
    };
  }

  private createSeatsForRoom({
    roomId,
    rowCount,
    seatsPerRow,
  }: {
    roomId: string;
    rowCount: number;
    seatsPerRow: number;
  }): Prisma.SeatCreateManyInput[] {
    const seats: Prisma.SeatCreateManyInput[] = [];

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const rowLabel = this.getRowLabel(rowIndex);

      for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
        seats.push({
          roomId,
          rowLabel,
          seatNumber,
        });
      }
    }

    return seats;
  }

  private getRowLabel(index: number): string {
    let label = "";
    let current = index;

    while (current >= 0) {
      label = String.fromCharCode((current % 26) + 65) + label;
      current = Math.floor(current / 26) - 1;
    }

    return label;
  }
}

namespace GenerateRoomSeatsUseCase {
  export type Input = {
    roomId: string;
  };

  export type Output = {
    seats: Seat[];
  };
}
