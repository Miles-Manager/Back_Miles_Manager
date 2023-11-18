import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInDTO {
  @ApiProperty({
    description: "The user's email",
    example: "example@gmail.com",
    nullable: false,
  })
  @IsEmail({}, { message: "E-mail is required" })
  email: string;

  @ApiProperty({
    description: "The user's ",
    example: "Abc123!@#",
    nullable: false,
  })
  @IsString({message: "Password is required"})
  password: string;
}
