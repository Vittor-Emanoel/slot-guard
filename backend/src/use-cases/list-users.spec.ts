import { beforeEach, describe, expect, it } from "vitest";
import { ListUsersUseCase } from "./list-users.use-case";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";

let userRepository: InMemoryUserRepository;
let sut: ListUsersUseCase;

describe("List Users - UseCase", () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    sut = new ListUsersUseCase(userRepository);
  });

  it("should be able to list users", async () => {
    await userRepository.create({
      name: "vittor",
      email: "vittor@gmail.com",
    });

    await userRepository.create({
      name: "test",
      email: "test@gmail.com",
    });

    const { users } = await sut.execute();

    expect(users).toHaveLength(2);
    expect(users).toEqual([
      expect.objectContaining({ name: "vittor" }),
      expect.objectContaining({ name: "test" }),
    ]);
  });
});
