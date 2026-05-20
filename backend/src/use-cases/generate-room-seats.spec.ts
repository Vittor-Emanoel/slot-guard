import { InMemoryRoomRepository } from "@/repositories/in-memory/in-memory-room-repository";
import { InMemorySeatRepository } from "@/repositories/in-memory/in-memory-seat-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateRoomUseCase } from "./create-room.use-case";
import { GenerateRoomSeatsUseCase } from "./generate-room-seats.use-case";

let roomRepository: InMemoryRoomRepository;
let seatRepository: InMemorySeatRepository;

let sut: GenerateRoomSeatsUseCase;

describe("Generate room seats - Use case", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    seatRepository = new InMemorySeatRepository();

    sut = new GenerateRoomSeatsUseCase(roomRepository, seatRepository);
  });

  it("should be able to generate room seats", async () => {
    const room = await roomRepository.create({
      name: "Room A",
      rowCount: 2,
      seatsPerRow: 3,
    });

    const { seats } = await sut.execute({
      roomId: room.id,
    });

    expect(seats).toHaveLength(6);

    expect(seats).toEqual([
      expect.objectContaining({
        roomId: room.id,
        rowLabel: "A",
        seatNumber: 1,
      }),
      expect.objectContaining({
        roomId: room.id,
        rowLabel: "A",
        seatNumber: 2,
      }),
      expect.objectContaining({
        roomId: room.id,
        rowLabel: "A",
        seatNumber: 3,
      }),
      expect.objectContaining({
        roomId: room.id,
        rowLabel: "B",
        seatNumber: 1,
      }),
      expect.objectContaining({
        roomId: room.id,
        rowLabel: "B",
        seatNumber: 2,
      }),
      expect.objectContaining({
        roomId: room.id,
        rowLabel: "B",
        seatNumber: 3,
      }),
    ]);
  });

  it("should persist generated seats in the repository", async () => {
    const room = await roomRepository.create({
      name: "Room A",
      rowCount: 2,
      seatsPerRow: 2,
    });

    await sut.execute({
      roomId: room.id,
    });

    const roomSeats = await seatRepository.findManyByRoomId(room.id);

    expect(roomSeats).toHaveLength(4);

    expect(roomSeats).toEqual([
      expect.objectContaining({
        rowLabel: "A",
        seatNumber: 1,
      }),
      expect.objectContaining({
        rowLabel: "A",
        seatNumber: 2,
      }),
      expect.objectContaining({
        rowLabel: "B",
        seatNumber: 1,
      }),
      expect.objectContaining({
        rowLabel: "B",
        seatNumber: 2,
      }),
    ]);
  });

  it("should not be able to generate seats for a non-existing room", async () => {
    await expect(() =>
      sut.execute({
        roomId: "non-existing-room-id",
      }),
    ).rejects.toThrow("Room not found.");
  });

  it("should not be able to generate seats twice for the same room", async () => {
    const room = await roomRepository.create({
      name: "Room A",
      rowCount: 2,
      seatsPerRow: 3,
    });

    await sut.execute({
      roomId: room.id,
    });

    await expect(() =>
      sut.execute({
        roomId: room.id,
      }),
    ).rejects.toThrow("Room already has seats.");
  });

  it("should generate row labels after Z correctly", async () => {
    const room = await roomRepository.create({
      name: "Large Room",
      rowCount: 27,
      seatsPerRow: 1,
    });

    const { seats } = await sut.execute({
      roomId: room.id,
    });

    expect(seats).toHaveLength(27);

    expect(seats[0]).toEqual(
      expect.objectContaining({
        rowLabel: "A",
        seatNumber: 1,
      }),
    );

    expect(seats[25]).toEqual(
      expect.objectContaining({
        rowLabel: "Z",
        seatNumber: 1,
      }),
    );

    expect(seats[26]).toEqual(
      expect.objectContaining({
        rowLabel: "AA",
        seatNumber: 1,
      }),
    );
  });
});
