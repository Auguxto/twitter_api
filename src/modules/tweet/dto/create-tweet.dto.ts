import { IsString } from "class-validator";

export default class CreateTweetDto {
  constructor(partial: Partial<CreateTweetDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  text: string;
}
