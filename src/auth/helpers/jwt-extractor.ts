import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';

export const jwtFromAuthHeader: JwtFromRequestFunction = (
  req: Request,
): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const [type, token] = authHeader.split(' ');
  return type === 'Bearer' ? token : null;
};
