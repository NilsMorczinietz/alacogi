import { ApiProperty } from '@nestjs/swagger';
import { UserGetDto } from 'src/user/dto/user-get.dto';

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT Access Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Benutzerdaten',
    type: UserGetDto,
  })
  user: UserGetDto;
}
