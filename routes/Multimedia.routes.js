import express from 'express';
import {
 getAllMultimediaContents,
 createMultimediaContent,
 getMultimediaContent,
 updateMultimediaContent,
 deleteMultimediaContent,
} from '../controllers/Multimedia.controller.js';
import { checkAuth } from "../middleware/checkAuth.js";
const router = express.Router();

router.route('/')
    .get(getAllMultimediaContents)
    .post(checkAuth,  createMultimediaContent)
router.route('/:id')
    .get(getMultimediaContent)
    .put(checkAuth, updateMultimediaContent)
    .delete(checkAuth, deleteMultimediaContent);

export default router;