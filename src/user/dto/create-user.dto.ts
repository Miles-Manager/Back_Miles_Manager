import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

export class CreateUserDto {
  @ApiProperty({
    description: "The user's CPF",
    example: '123.456.789-10',
    nullable: false,
  })
  @IsCPF({ message: 'Invalid CPF' })
  cpf: string;

  @ApiProperty({
    description: "The user's email",
    example: 'example@gmail.com',
    nullable: false,
  })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({
    description: "The user's password",
    example: 'Abc123!@#',
    nullable: false,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: "The user's role",
    example: $Enums.Role.ADMIN,
    nullable: false,
  })
  @IsEnum($Enums.Role)
  role: $Enums.Role;
}
