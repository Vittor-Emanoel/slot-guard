import type { Prisma, Movie, User } from "generated/prisma/client";
import type { IMovieRepository } from "../IMovieRepository";
import { randomUUID } from "node:crypto";
import { IUserRepository } from "../IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      createdAt: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async findMany(): Promise<User[]> {
    return this.items;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);

    return user ?? null;
  }
}
