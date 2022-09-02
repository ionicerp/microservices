import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

const projectId = process.env.GCP_PROJECT || JSON.parse(process.env.SERVICE_ACCOUNT!).project_id;

export const authenticate = () => async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Unauthorized request', status: 'error' });
  }
  const [authType, idToken] = req.headers.authorization.split(' ');
  if (authType.toLocaleLowerCase() !== 'bearer') {
    return res.status(401).send({ message: 'Invalid auth type', status: 'error' });
  }
  if (!idToken) {
    return res.status(401).send({ message: 'No auth token', status: 'error' });
  }
  try {
    console.time('verify');
    const decodedIdToken = await admin.auth().verifyIdToken(idToken, true);
    console.timeEnd('verify');
    if (!decodedIdToken || !decodedIdToken.uid) {
      return res.status(401).send({ message: 'Invalid auth token', status: 'error' });
    }
  } catch (error) {
    return res.status(401).send({ message: 'Invalid auth token', status: 'error' });
  }

  // const publicKeyResponse = await axios.get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com', {
  //   method: 'GET',
  //   responseType: 'json'
  // });
  // const publicKeyObject = publicKeyResponse.data;
  // const publicKeyList: string[] = Object.keys(publicKeyObject).map(key => {
  //   return publicKeyObject[key];
  // });
  // let decodedToken;
  // for (const publicKey of publicKeyList) {
  //   try {
  //     const jwtPayload = jwt.verify(idToken, publicKey, { algorithms: ['RS256'] }) as jwt.JwtPayload;
  //     if (jwtPayload && jwtPayload.exp && jwtPayload.iat && jwtPayload.aud && jwtPayload.iss && jwtPayload.sub) {
  //       // exp must be future time
  //       if (jwtPayload.exp < Date.now() / 1000) {
  //         throw new Error('Token expired');
  //       }
  //       // iat must past time
  //       if (jwtPayload.iat > Date.now() / 1000) {
  //         throw new Error('Token not yet valid');
  //       }
  //       // aud must be project id
  //       if (jwtPayload.aud !== projectId) {
  //         throw new Error('Token not for this project');
  //       }
  //       // iss must be https://securetoken.google.com/<projectId>
  //       if (jwtPayload.iss !== `https://securetoken.google.com/${projectId}`) {
  //         throw new Error('Token not for this project');
  //       }
  //       if (!jwtPayload.sub) {
  //         throw new Error('uuid is not found');
  //       }
  //       const user = await admin.auth().getUser(jwtPayload.sub);
  //       decodedToken = jwtPayload;
  //       break;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // if (!decodedToken) {
  //   res.status(401).send({
  //     message: 'Invalid token',
  //     status: 'error'
  //   });
  //   return;
  // }
  next();
};
