import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserId } from './entity/user-id';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Find all users (without password)
   */
  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Find user by ID (without password)
   */
  public findById(id: UserId): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * Find user by email (without password by default)
   */
  public findByEmail(email: string, includePassword = false): Promise<User | null> {
    if (includePassword) {
      return this.userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'name', 'password'],
      });
    }
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Create user with hashed password (used by AuthService)
   */
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
}
