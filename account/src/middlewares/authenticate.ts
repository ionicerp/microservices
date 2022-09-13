import { NextFunction, Request, Response } from 'express';

export const authenticate = () => async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      throw new Error('No authorization header');
    }
    const [authType, creds] = authHeader.split(' ');
    if (authType.toLowerCase() !== 'bearer') {
      throw new Error('Invalid authorization type');
    }
      
    next();
  } catch (error: any) {
    console.error(error);
    res.status(401).send({ message: error.message, status: 'error', data: error });
  }
};
