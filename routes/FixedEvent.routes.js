import express from 'express';
import {
 getAllFixedEvents,
 createFixedEvent,
 getFixedEvent,
 updateFixedEvent,
 deleteFixedEvent,
} from '../controllers/FixedEvent.controller.js';
import { checkAuth } from "../middleware/checkAuth.js";
const router = express.Router();

router.route('/')
    .get(getAllFixedEvents)
    .post(checkAuth,  createFixedEvent)
router.route('/:id')
    .get(getFixedEvent)
    .put(checkAuth, updateFixedEvent)
    .delete(checkAuth, deleteFixedEvent);
export default router;