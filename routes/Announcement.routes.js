import express from 'express';
import {
 getAllAnnouncements,
 createAnnouncement,
 getAnnouncement,
 updateAnnouncement,
 deleteAnnouncement,
} from '../controllers/announcementController';

const router = express.Router();

router.get('/', getAllAnnouncements);
router.post('/', createAnnouncement);
router.get('/:id', getAnnouncement);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);

export default router;