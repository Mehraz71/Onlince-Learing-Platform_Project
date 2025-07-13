/*import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}*/

import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
  Patch,
  Body,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/roles/roles.guard';
import { CONSTANTS } from 'src/constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SessionJwtGuard } from 'src/auth/session-token.middleware';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.admin))
  @Patch('update/:id/role')
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') role: string,
  ) {
    return this.usersService.updateRole(id, role);
  }

  /*@Patch('update/profile/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { username, email, password, phone } = updateUserDto;
    return this.usersService.update_user(id, username, email, password, phone);
  }*/
 @Patch('/update/profile/:id')
async updateUser(
  @Param('id') id: number,
  @Body() dto: UpdateUserDto,
) {
  return this.usersService.update_user(
    id,
    dto.username,
    dto.email,
    dto.password, 
    dto.phone,
    dto.role,
    
  );
}

 


  @Delete('/delete-user/:id')
  async deleteUser(
    @Param('id') id: number,
  ): Promise<{ id: number; message: string }> {
    return this.usersService.delete_user(id);
  }

@Post()
async createUser(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}




}
