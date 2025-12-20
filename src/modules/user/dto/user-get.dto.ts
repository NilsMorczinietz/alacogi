import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Permission } from '../../../common/enums/permission.enum';

export class UserGetDto {
  @ApiProperty({
    description: 'Die eindeutige ID des Benutzers',
    example: '09acfb2b-d28e-4b2f-a47e-4cc58a6eb27a',
  })
  @IsUUID()
  @IsNotEmpty()
  public id: string;

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
    description: 'Die Berechtigungen des Benutzers',
    example: ['user:read'],
    type: [String],
    enum: Permission,
  })
  @IsArray()
  @IsEnum(Permission, { each: true })
  public permissions: Permission[];
}
