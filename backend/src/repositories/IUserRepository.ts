import { Prisma, User } from "generated/prisma/client";

export interface IUserRepository {
  create(date: Prisma.UserCreateInput): Promise<User>;
  findMany(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}
