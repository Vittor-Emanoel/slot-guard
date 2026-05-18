import { beforeEach, describe, expect, it, vi } from "vitest";
import { ListMoviesSessionsUseCase } from "./list-movies-sessions.use-case";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    movieSession: {
      findMany: vi.fn().mockResolvedValue([]),
    },
  },
}));

let sut: ListMoviesSessionsUseCase;

describe("list movies sessions - use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sut = new ListMoviesSessionsUseCase();
  });

  it("should be able to list movies sessions", async () => {
    const moviesSessions = await sut.execute();

    expect(moviesSessions).toBeDefined();
    expect(moviesSessions).toEqual([]);
  });
});
