import { IUserRepository } from "@/repositories/IUserRepository";
import { User } from "generated/prisma/client";

export class ListUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<ListUsersUseCase.Output> {
    const users = await this.userRepository.findMany();

    return { users };
  }
}

export namespace ListUsersUseCase {
  export type Output = {
    users: User[];
  };
}
