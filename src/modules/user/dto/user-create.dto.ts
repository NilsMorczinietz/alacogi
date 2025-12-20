import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

  @ApiProperty({
    description: 'Der eigene Divera Access Key von DIVERA 24/7',
    example: 'gAWAKJ8lphLvW7rNMcmZSFzBMvgg53lb_pMbOXzUVS3czdfMlc7-WPVnOtRGinNN',
  })
  @IsString()
  public diveraAccessKey: string;
}
