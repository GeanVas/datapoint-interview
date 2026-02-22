import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import * as userRepository from '../../users/domain/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: userRepository.IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(username: string, password: string) {
    const user = await this.userRepo.findByUsername(username);
    if (!user) throw new UnauthorizedException();

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException();

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        username: user.username,
      }),
    };
  }
}
