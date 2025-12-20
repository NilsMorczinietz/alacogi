import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '../../../common/enums/permission.enum';

export class UserGetDto {
  @ApiProperty({
    description: 'Die eindeutige ID des Benutzers',
    example: '09acfb2b-d28e-4b2f-a47e-4cc58a6eb27a',
  })
  public id: string;

  @ApiProperty({
    description: 'Der Name des Benutzers',
    example: 'Max Mustermann',
  })
  public name: string;

  @ApiProperty({
    description: 'Die E-Mail-Adresse des Benutzers',
    example: 'max@example.com',
  })
  public email: string;

  @ApiProperty({
    description: 'Der hinterlegte Divera Access Key des Benutzers',
    example: 'gAWAKJ8lphLvW7rNMcmZSFzBMvgg53lb_pMbOXzUVS3czdfMlc7-WPVnOtRGinNN',
  })
  public diveraAccessKey: string;

  @ApiProperty({
    description: 'Die Berechtigungen des Benutzers',
    example: ['user:read'],
    type: [String],
    enum: Permission,
  })
  public permissions: Permission[];
}
