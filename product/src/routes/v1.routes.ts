import { Router } from 'express';
import * as v1 from '../controllers/v1.controllers';

const router = Router();

router.post('/', v1.createData);
router.get('/:id', v1.getData);
router.post('/list', v1.listData);
router.put('/', v1.updateData);
router.delete('/:id', v1.deleteData);

export const v1Routes = router;