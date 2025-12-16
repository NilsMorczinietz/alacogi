import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Alle Benutzer abrufen' })
  @ApiResponse({ status: 200, description: 'Liste aller Benutzer' })
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Neuen Benutzer erstellen' })
  @ApiResponse({ status: 201, description: 'Benutzer erfolgreich erstellt' })
  @ApiResponse({ status: 400, description: 'Ungültige Eingabedaten' })
  create(@Body() createUserDto: UserCreateDto) {
    return this.userService.create(createUserDto);
  }
}
