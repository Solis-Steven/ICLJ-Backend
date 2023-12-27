import express from "express";
import { 
    register,
    confirmAccount,
    authenticate,
    forgotPassword,
    checkToken,
    newPassword
} from "../controllers/User.controller.js"

const router = express.Router();

router.post("/", register);
router.get("/confirm/:token", confirmAccount);
router.post("/login", authenticate);
router.post("/forgot-password", forgotPassword); 
router.route("/forgot-password/:token")
    .get(checkToken)
    .post(newPassword);

export default router;