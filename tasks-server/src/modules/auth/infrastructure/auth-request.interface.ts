import { Request } from 'express';
import { JwtPayload } from '../domain/jwt-payload.interface';

export interface AuthRequest extends Request {
  user: JwtPayload;
}
