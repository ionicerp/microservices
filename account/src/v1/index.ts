import { Request, Response, Router } from 'express';
import { GoogleAuth } from 'google-auth-library';
import 'dotenv/config';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import FormData from 'form-data';

const router = Router();

// create
router.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  try {
    if (process.env.NON_GOOGLE_ENV) {
      const keys = JSON.parse(process.env.SERVICE_ACCOUNT_KEY!);
      const signedToken = jwt.sign({
        target_audience: 'http://localhost:5050',
      }, keys.private_key, {
        algorithm: 'RS256',
        expiresIn: '60s',
        audience: 'https://www.googleapis.com/oauth2/v4/token',
        issuer: keys.client_email,
        subject: keys.client_email,
        header: {
          typ: 'JWT',
          alg: 'RS256',
        },
      });
      const newFormData = new FormData();
      newFormData.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
      newFormData.append('assertion', signedToken);

      const googleIdTokenResult = await axios.post(
        'https://www.googleapis.com/oauth2/v4/token',
        newFormData,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${signedToken}`
          },
        }
      );
      const result = await axios.post('http://localhost:5050/v1', body, {
        headers: {
          'Authorization': `Bearer ${googleIdTokenResult.data.id_token}`,
          'Content-Type': 'application/json',
        },
        responseType: 'json',
        method: 'POST',
      });
      res.status(200).send(result.data);
    } 
    else {
      const auth = new GoogleAuth();
      const url = `https://product-6b6yfpthva-uc.a.run.app`;
      const client = await auth.getIdTokenClient(url);
      const result = await client.request<any>({
        url: `${url}/v1`,
        method: 'POST',
        data: body,
      });
      res.status(200).send(result.data);
    }

  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// read 1
router.get('/', async (req: Request, res: Response) => {
  const id = req.query.id as string;
  try {
    res.status(200).send({ message: 'success', status: 'success', data: { id: id } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// read many
router.post('/get_by', async (req: Request, res: Response) => {
  const body = req.body;
  try {
    res.status(200).send({ message: 'success', status: 'success', data: body });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// update
router.put('/', async (req: Request, res: Response) => {
  const body = req.body;
  try {
    res.status(200).send({ message: 'success', status: 'success', data: body });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// delete
router.delete('/', async (req: Request, res: Response) => {
  const id = req.query.id as string;
  try {
    res.status(200).send({ message: 'success', status: 'success', data: { id: id } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

export const v1 = router;
