// Router ConsolidationHouse
import express from 'express';


import {
 getAllConsolidationHouses,
 createConsolidationHouse,
 getConsolidationHouse,
 updateConsolidationHouse,
 deleteConsolidationHouse,
} from '../controllers/ConsolidationHouse.controller.js';

const router = express.Router();

router.get('/', getAllConsolidationHouses);
router.post('/', createConsolidationHouse);
router.get('/:id', getConsolidationHouse);
router.put('/:id', updateConsolidationHouse);
router.delete('/:id', deleteConsolidationHouse);

export default router;