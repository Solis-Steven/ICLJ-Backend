// Router ConsolidationHouse
import express from 'express';
import {
 getAllConsolidationHouses,
 createConsolidationHouse,
 getConsolidationHouse,
 updateConsolidationHouse,
 deleteConsolidationHouse,
} from '../controllers/ConsolidationHouse.controller.js';
import { checkAuth } from "../middleware/checkAuth.js";
const router = express.Router();
router.route('/')
    .get(getAllConsolidationHouses)
    .post(checkAuth,  createConsolidationHouse)
router.route('/:id')
    .get(getConsolidationHouse)
    .put(checkAuth, updateConsolidationHouse)
    .delete(checkAuth, deleteConsolidationHouse);

export default router;