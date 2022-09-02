import express from 'express';
import { getServiceUrl } from '../services';
import { GoogleAuth } from 'google-auth-library';
import { IResponse } from '../interfaces/response.interface';
const auth = new GoogleAuth();

const router = express.Router();

// create
router.post('/:service', async (req, res) => {
  const service = req.params.service;
  const basedUrl = getServiceUrl(service);
  const url = `${basedUrl}/v1/${service}`;
  try {
    const client = await auth.getIdTokenClient(`${basedUrl}/`);
    const result = await client.request<IResponse>({
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      data: req.body,
      responseType: 'json',
    });
    res.status(result.status).send({ message: result.data.message, status: 'success', data: result.data.data });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error' });
  }
});

// read 1
router.get('/:service/:id', async (req, res) => {
  const service = req.params.service;
  const id = req.params.id;
  const basedUrl = getServiceUrl(service);
  const url = `${basedUrl}/v1/${service}`;
  try {
    const client = await auth.getIdTokenClient(`${basedUrl}/`);
    const result = await client.request<IResponse>({
      url: url,
      method: 'GET',
      responseType: 'json',
    });
    res.status(result.status).send({ message: result.data.message, status: 'success', data: result.data.data });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// read many
router.post('/:service/get_by', async (req, res) => {
  const service = req.params.service;
  const basedUrl = getServiceUrl(service);
  const url = `${basedUrl}/v1/${service}`;
  try {
    const client = await auth.getIdTokenClient(`${basedUrl}/`);
    const result = await client.request<IResponse>({
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: req.body,
      method: 'POST',
      responseType: 'json',
    });
    res.status(result.status).send({ message: result.data.message, status: 'success', data: result.data.data });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// update
router.put('/:service', async (req, res) => {
  const service = req.params.service;
  const basedUrl = getServiceUrl(service);
  const url = `${basedUrl}/v1/${service}`;
  try {
    const client = await auth.getIdTokenClient(`${basedUrl}/`);
    const result = await client.request<IResponse>({
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: req.body,
      method: 'PUT',
      responseType: 'json',
    });
    res.status(result.status).send({ message: result.data.message, status: 'success', data: result.data.data });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// delete
router.delete('/:service/:id', async (req, res) => {
  const service = req.params.service;
  const id = req.params.id;
  const basedUrl = getServiceUrl(service);
  const url = `${basedUrl}/v1/${service}`;
  try {
    const client = await auth.getIdTokenClient(`${basedUrl}/`);
    const result = await client.request<IResponse>({
      url: url,
      params: { id: id },
      method: 'DELETE',
      responseType: 'json',
    });
    res.status(result.status).send({ message: result.data.message, status: 'success', data: result.data.data });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

export const v1 = router;
