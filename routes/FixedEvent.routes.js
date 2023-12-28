import express from 'express';
import {
 getAllFixedEvents,
 createFixedEvent,
 getFixedEvent,
 updateFixedEvent,
 deleteFixedEvent,
} from '../controllers/fixedEventController';

const router = express.Router();

router.get('/', getAllFixedEvents);
router.post('/', createFixedEvent);
router.get('/:id', getFixedEvent);
router.put('/:id', updateFixedEvent);
router.delete('/:id', deleteFixedEvent);

export default router;