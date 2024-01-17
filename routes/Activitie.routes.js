import express from "express";
import { 
    agendActivitie,
    editActivitie,
    deleteActivitie,
    getAllActivities,
    getActivitie,
    addActivitieUser
} from "../controllers/Activitie.controller.js"
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/")
    .post(checkAuth, agendActivitie)
    .get(getAllActivities)
router.route("/:id")
    .get(checkAuth, getActivitie)
    .post(checkAuth, addActivitieUser)
    .put(checkAuth, editActivitie)
    .delete(checkAuth, deleteActivitie);


export default router;