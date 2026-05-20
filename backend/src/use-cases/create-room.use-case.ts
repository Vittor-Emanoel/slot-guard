import { IRoomRepository } from "@/repositories/IRoomRepository";
import { Room } from "generated/prisma/client";

export class CreateRoomUseCase {
  constructor(private readonly roomRepository: IRoomRepository) {}

  async execute(
    data: CreateRoomUseCase.Input,
  ): Promise<CreateRoomUseCase.Output> {
    const roomAlreadyExists = await this.roomRepository.findByName(data.name);

    if (roomAlreadyExists) {
      throw new Error("Room Already Exists");
    }

    const room = await this.roomRepository.create(data);

    return {
      room,
    };
  }
}

namespace CreateRoomUseCase {
  export type Input = {
    name: string;
    rowCount: number;
    seatsPerRow: number;
  };

  export type Output = {
    room: Room;
  };
}
