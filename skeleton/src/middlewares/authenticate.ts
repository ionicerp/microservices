import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const authenticate = () => async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send({ message: 'No authorization header', status: 'error' });
    return;
  }
  const [authType, creds] = authHeader.split(' ');
  if (authType.toLowerCase() !== 'bearer') {
    res.status(401).send({ message: 'Invalid authorization type', status: 'error' });
    return;
  }
  try {
    // const decodedToken = jwt.verify(creds, process.env.JWT_SECRET!);
    next();
  } catch (error: any) {
    console.error(error);
    res.status(401).send({ message: error.message, status: 'error', data: error });
  }
};
