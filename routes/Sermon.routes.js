import express from "express";
import { 
    addSermon,
    editSermon,
    deleteSermon,
    getAllSermons,
    getSermon
} from "../controllers/Sermon.controller.js"
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/")
    .post(checkAuth, addSermon)
    .get(checkAuth, getAllSermons)
router.route("/:id")
    .get(checkAuth, getSermon)
    .put(checkAuth, editSermon)
    .delete(checkAuth, deleteSermon);


export default router;