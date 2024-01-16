import express from "express";
import { 
    addTestimonial,
    editTestimonial,
    deleteTestimonial,
    getTestimonial,
    getAllTestimonials
} from "../controllers/Testimonial.controller.js"
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/")
    .post(checkAuth, addTestimonial)
    .get(getAllTestimonials)
router.route("/:id")
    .get(checkAuth, getTestimonial)
    .put(checkAuth, editTestimonial)
    .delete(checkAuth, deleteTestimonial);


export default router;