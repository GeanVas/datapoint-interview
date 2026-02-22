import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { IPasswordHasher } from '../domain/password-hasher.interface';

@Injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
