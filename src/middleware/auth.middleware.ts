import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const VALID_TOKENS = process.env.STATIC_TOKENS?.split(',') || [];

/**
 * Authentication via Bearer token in the Authorization header
 */
export const authenticateStaticToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Kein oder ungültiger Authorization Header' });
  }

  const token = authHeader.split(' ')[1];

  if (!VALID_TOKENS.includes(token)) {
    return res.status(403).json({ message: 'Zugriff verweigert – ungültiger Token' });
  }

  next();
};

/**
 * Authentication via token passed as a query parameter (?token=XYZ)
 */
export const authenticateParamToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.query.token as string;

  if (!token) {
    return res.status(401).json({ message: 'Kein Token als Parameter übergeben' });
  }

  if (!VALID_TOKENS.includes(token)) {
    return res.status(403).json({ message: 'Zugriff verweigert – ungültiger Parameter-Token' });
  }

  next();
};

/**
 * Combined authentication:
 * Succeeds if EITHER method (header OR query parameter) is valid
 */
export const combineAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const tokenFromHeader =
    authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  const tokenFromQuery = req.query.token as string;

  if (VALID_TOKENS.includes(tokenFromHeader || '') || VALID_TOKENS.includes(tokenFromQuery || '')) {
    return next();
  }

  return res.status(403).json({ message: 'Zugriff verweigert – kein gültiger Token gefunden' });
};
