import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({
    description: 'Der Name des Benutzers',
    example: 'Max Mustermann',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    description: 'Die E-Mail-Adresse des Benutzers',
    example: 'max@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
