import { Router } from 'express';
import * as admin from 'firebase-admin';
import { buildQueryFirestore } from '../helper';
import { IFirestoreQuery } from '../interfaces/query.interface';

const router = Router();

// create
router.post('/', async (req, res) => {
  const body = req.body;
  try {
    const result = await admin.firestore().collection('quotes').add({ ...body, added_on: new Date() });
    res.status(200).send({ message: 'Created', status: 'success', data: { id: result.id } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// read 1
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await admin.firestore().collection('quotes').doc(id).get();
    res.status(200).send({ message: 'success', status: 'success', data: { ...result.data(), id: result.id } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// read many
router.post('/get_by', async (req, res) => {
  const body: IFirestoreQuery = req.body;
  try {
    const result = await buildQueryFirestore({ ...body, collection: 'quotes' }).get();
    res.status(200).send({ message: 'success', status: 'success', data: result.docs });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

// update
router.put('/', async (req, res) => {
  const body = req.body;
  try {
    await admin.firestore().collection('quotes').doc(body.id).update(body);
    res.status(200).send({ message: 'Updated', status: 'success' });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

export const v1 = router;
