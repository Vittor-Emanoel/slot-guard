import { InMemoryRoomRepository } from "@/repositories/in-memory/in-memory-room-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateRoomUseCase } from "./create-room.use-case";
import { ListRoomsUseCase } from "./list-rooms.use-case";

let roomRepository: InMemoryRoomRepository;
let sut: ListRoomsUseCase;

describe("List rooms - Use case", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    sut = new ListRoomsUseCase(roomRepository);
  });

  it("should be able to list rooms", async () => {
    await roomRepository.create({
      name: "Room A",
      rowCount: 5,
      seatsPerRow: 8,
    });

    await roomRepository.create({
      name: "Room B",
      rowCount: 4,
      seatsPerRow: 6,
    });

    const { rooms } = await sut.execute();

    expect(rooms).toHaveLength(2);

    expect(rooms).toEqual([
      expect.objectContaining({
        name: "Room A",
        rowCount: 5,
        seatsPerRow: 8,
      }),
      expect.objectContaining({
        name: "Room B",
        rowCount: 4,
        seatsPerRow: 6,
      }),
    ]);
  });

  it("should return an empty list when there are no rooms", async () => {
    const { rooms } = await sut.execute();

    expect(rooms).toEqual([]);
  });
});
