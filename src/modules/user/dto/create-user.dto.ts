import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches
} from "class-validator";

export default class CreateUserDto {
  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
