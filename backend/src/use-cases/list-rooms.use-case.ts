import { IRoomRepository } from "@/repositories/IRoomRepository";
import { Room } from "generated/prisma/client";

export class ListRoomsUseCase {
  constructor(private readonly roomRepository: IRoomRepository) {}

  async execute(): Promise<ListRoomsUseCase.Output> {
    const rooms = await this.roomRepository.findMany();

    return {
      rooms,
    };
  }
}

namespace ListRoomsUseCase {
  export type Output = {
    rooms: Room[];
  };
}
