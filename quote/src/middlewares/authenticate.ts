import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

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
    const jwtPayload = jwt.decode(creds, {
      json: true,
    });

    if (jwtPayload && jwtPayload.exp && jwtPayload.iat && jwtPayload.aud && jwtPayload.iss && jwtPayload.sub) {
      // exp must be future time
      if (jwtPayload.exp < Date.now() / 1000) {
        throw new Error('Token expired');
      }
      // iat must past time
      if (jwtPayload.iat > Date.now() / 1000) {
        throw new Error('Token not yet valid');
      }
      // aud must be project id
      // if (jwtPayload.aud !== projectId) {
      //   throw new Error('Token not for this project');
      // }
      // iss must be https://securetoken.google.com/<projectId>
      if (jwtPayload.iss !== 'https://accounts.google.com') {
        throw new Error('Token not for this project');
      }
      // if (!jwtPayload.sub) {
      //   throw new Error('uuid is not found');
      // }
    }
    next();
  } catch (error: any) {
    console.error(error);
    res.status(401).send({ message: error.message, status: 'error', data: error });
  }
};
