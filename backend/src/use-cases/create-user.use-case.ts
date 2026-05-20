import { IUserRepository } from "@/repositories/IUserRepository";
import { User } from "generated/prisma/client";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    data: CreateUserUseCase.Input,
  ): Promise<CreateUserUseCase.Output> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const user = await this.userRepository.create(data);

    return {
      user,
    };
  }
}

namespace CreateUserUseCase {
  export type Input = {
    name: string;
    email: string;
  };

  export type Output = {
    user: User;
  };
}
