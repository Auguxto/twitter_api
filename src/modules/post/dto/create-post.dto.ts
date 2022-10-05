import { IsString } from "class-validator";

export default class CreatePostDto {
  constructor(partial: Partial<CreatePostDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  text: string;
}
