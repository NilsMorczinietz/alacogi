import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'max@example.com' })
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  public password: string;
}
