import { ApiProperty } from '@nestjs/swagger';
import { UserGetDto } from '../../user/dto/user-get.dto';

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT Access Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  public access_token: string;

  @ApiProperty({
    description: 'Benutzerdaten',
    type: UserGetDto,
  })
  public user: UserGetDto;
}
