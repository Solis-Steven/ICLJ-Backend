import express from "express";
import {
    getAllSites,
    addSite,
    editSite,
    deleteSite,
   } from '../controllers/Site.controller.js';
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/")
    .post(checkAuth, addSite)
    .get(getAllSites)
router.route("/:id")
    .put(checkAuth, editSite)
    .delete(checkAuth, deleteSite)                                                              ;


export default router;