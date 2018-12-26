import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { AuthModel } from './model/auth.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayloadInterface): Promise<UserEntity | null> {
    return await this.userService.findById(payload.id);
  }

  async authenticate(auth: AuthModel): Promise<string> {
    const user = await this.userService.findByEmailWithPassword(auth.email);
    if (!user) {
      throw new BadRequestException('Email not found.');
    }

    if (!await this.userService.compareHash(auth.password, user.password)) {
      throw new BadRequestException('Invalid credentials.');
    }

    return this.jwtService.sign({ id: user.id });
  }
}
