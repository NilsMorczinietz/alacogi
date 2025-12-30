import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserId } from './entity/user-id';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public findById(id: UserId): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  public findByEmail(email: string, includePassword = false): Promise<User | null> {
    if (includePassword) {
      return this.userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'name', 'password', 'permissions'],
      });
    }
    return this.userRepository.findOne({ where: { email } });
  }

  public async createWithPassword(
    email: string,
    name: string,
    hashedPassword: string,
  ): Promise<User> {
    const user = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  public async updateRefreshToken(userId: UserId, refreshToken: string | null): Promise<void> {
    if (!refreshToken) return;
    await this.userRepository.update({ id: userId }, { refreshToken });
  }

  public async getRefreshToken(userId: UserId): Promise<string | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'refreshToken'],
    });
    return user?.refreshToken ?? null;
  }
}
