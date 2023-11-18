import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "The user's email",
    example: "example@gmail.com",
    nullable: false,
  })
  @IsEmail({}, { message: "Invalid email" })
  email: string;

  @ApiProperty({
    description: "The user's password",
    example: "Abc123!@#",
    nullable: false,
  })
  @IsString()
  password: string;
}
