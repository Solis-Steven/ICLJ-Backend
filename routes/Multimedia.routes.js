import express from 'express';
import {
 getAllMultimediaContents,
 createMultimediaContent,
 getMultimediaContent,
 updateMultimediaContent,
 deleteMultimediaContent,
} from '../controllers/multimediaContentController';

const router = express.Router();

router.get('/', getAllMultimediaContents);
router.post('/', createMultimediaContent);
router.get('/:id', getMultimediaContent);
router.put('/:id', updateMultimediaContent);
router.delete('/:id', deleteMultimediaContent);

export default router;