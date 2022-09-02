import express from 'express';

const router = express.Router();

// create
router.post('/', async (req, res) => {
  const body = req.body;
  try {
    res.status(200).send({ message: 'Product v1 create success', status: 'success', data: body });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error' });
  }
});

// read 1
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    res.status(200).send({ message: 'Product v1 read 1 success', status: 'success', data: { id: id } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error' });
  }
});

// read many
router.post('/get_by', async (req, res) => {
  const body = req.body;
  try {
    res.status(200).send({ message: 'Product v1 read many success', status: 'success', data: body });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error' });
  }
});

// update
router.put('/', async (req, res) => {
  const body = req.body;
  try {
    res.status(200).send({ message: 'Product v1 update success', status: 'success', data: body });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error' });
  }
});

// delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    res.status(200).send({ message: 'Product v1 delete success', status: 'success', data: { id: id } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error' });
  }
});

export const v1 = router;
