
import jwt, { JwtPayload } from 'jsonwebtoken';
import { envs } from './envs';

const SECRET = envs.JWT_SECRET;

export class JWTadapter {

  static generateToken(payload: any): string {
    return jwt.sign(payload, SECRET, { expiresIn: '24h' });
  }

  static validateJWT(token: string): any {
    try {
      return jwt.verify(token, SECRET);
    } catch (error) {
      console.error('Invalid JWT token:', error);
      return null;
    }
  }
}
