import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateRole(id: number, role: string): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User not found');

    user.role = role;
    return this.usersRepository.save(user);
  }

  async update_user(
    id: number,
    username: string,
    email: string,
    role:string,
    password?: string,
    phone?: string,
    
  ): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User Profile Not Found');

    user.username = username;
    user.email = email;
    user.role= role;
    if (password) {
    user.password = password;
  }
  if (phone) {
    user.phone = phone;

   
  }
   return this.usersRepository.save(user);
  }

async resetpassword(
  email: string,
  newPassword: string,
  token?: string, 
): Promise<User> {
  const user = await this.findByEmail(email);
  if (!user) throw new NotFoundException('User not found');

  
  if (token && user.resetPasswordToken !== token) {
    throw new UnauthorizedException('Invalid reset token');
  }

  
  user.password = await bcrypt.hash(newPassword, 10);
  

  user.resetPasswordToken = null;
  
  return this.usersRepository.save(user);
}


//
  async delete_user(id: number): Promise<{ id: number; message: string }> {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User Not Found');

    await this.usersRepository.remove(user);
    return { id, message: `User with ID ${id} has been deleted` };
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }


  async update(id: number, updateData: Partial<User>) {
  await this.usersRepository.update(id, updateData);
  return this.findOneById(id); 
}

}
