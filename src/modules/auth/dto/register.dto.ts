import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Max Mustermann' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ example: 'max@example.com' })
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6, { message: 'Passwort muss mindestens 6 Zeichen lang sein' })
  public password: string;
}
