import { Router } from 'express';

const router = Router();

// sample calling other services
// import { GoogleAuth } from 'google-auth-library';
// import { IResponse } from '../interfaces/response.interface';
// const auth = new GoogleAuth();
// router.post('/:service', async (req, res) => {
//   const service = req.params.service;
//   const basedUrl = 'https://service-abc-uc.a.run.app';
//   const url = `${basedUrl}/v1/${service}`;
//   try {
//     const client = await auth.getIdTokenClient(`${basedUrl}/`);
//     const result = await client.request<IResponse>({
//       url: url,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//       data: req.body,
//       responseType: 'json',
//     });
//     res.status(result.status).send({ message: result.data.message, status: 'success', data: result.data.data });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).send({ message: error.message, status: 'error' });
//   }
// });


// create
router.post('/', async (req, res) => {
  const body = req.body;
  try {
    res.status(200).send({ message: 'success', status: 'success', data: body });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// read 1
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    res.status(200).send({ message: 'success', status: 'success', data: { id: id } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// read many
router.post('/get_by', async (req, res) => {
  const body = req.body;
  try {
    res.status(200).send({ message: 'success', status: 'success', data: body });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// update
router.put('/', async (req, res) => {
  const body = req.body;
  try {
    res.status(200).send({ message: 'success', status: 'success', data: body });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    res.status(200).send({ message: 'success', status: 'success', data: { id: id } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

export const v1 = router;
