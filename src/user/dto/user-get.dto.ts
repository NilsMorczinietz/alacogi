import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserGetDto {
  @ApiProperty({
    description: 'Der Name des Benutzers',
    example: 'Max Mustermann',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Die E-Mail-Adresse des Benutzers',
    example: 'max@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
