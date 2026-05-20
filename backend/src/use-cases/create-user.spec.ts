import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserUseCase } from "./create-user.use-case";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";

let userRepository: InMemoryUserRepository;
let sut: CreateUserUseCase;

describe("create user - Use Case", () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    sut = new CreateUserUseCase(userRepository);
  });

  it("should be able to create user", async () => {
    const { user } = await sut.execute({
      name: "vittor",
      email: "oi@gmail.com",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should be able to return error when creating user with with an existing name.", async () => {
    await sut.execute({
      name: "vittor",
      email: "oi@gmail.com",
    });

    await expect(() =>
      sut.execute({
        name: "vittor",
        email: "oi@gmail.com",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
