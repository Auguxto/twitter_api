import { IsString } from "class-validator";

export class AuthenticateUserDto {
  constructor(partial: Partial<AuthenticateUserDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  username: string;

  @IsString()
  password: string;
}
