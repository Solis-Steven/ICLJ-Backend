import express from 'express';
import {
 getAllAnnouncements,
 createAnnouncement,
 getAnnouncement,
 updateAnnouncement,
 deleteAnnouncement,
} from '../controllers/Announcement.controller.js';
import { checkAuth } from "../middleware/checkAuth.js";
const router = express.Router();
router.route('/')
    .get(getAllAnnouncements)
    .post(checkAuth,  createAnnouncement)
router.route('/:id')
    .get(getAnnouncement)
    .put(checkAuth, updateAnnouncement)
    .delete(checkAuth, deleteAnnouncement);
export default router;