import { beforeEach, describe, expect, it } from "vitest";
import { CreateRoomUseCase } from "./create-room.use-case";
import { InMemoryRoomRepository } from "@/repositories/in-memory/in-memory-room-repository";

let roomRepository: InMemoryRoomRepository;
let sut: CreateRoomUseCase;

describe("create room - use case", () => {
  beforeEach(async () => {
    roomRepository = new InMemoryRoomRepository();
    sut = new CreateRoomUseCase(roomRepository);
  });

  it("should be able to create room", async () => {
    const { room } = await sut.execute({
      name: "Room A",
      rowCount: 5,
      seatsPerRow: 8,
    });

    expect(room.id).toEqual(expect.any(String));
  });

  it("should be able return error when creating a room with an existing name.", async () => {
    await sut.execute({
      name: "Room A",
      rowCount: 5,
      seatsPerRow: 8,
    });

    await expect(() =>
      sut.execute({
        name: "Room A",
        rowCount: 5,
        seatsPerRow: 8,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
