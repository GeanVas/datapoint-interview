import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../application/login.usecase';

@Controller()
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.loginUseCase.execute(body.username, body.password);
  }
}
