import express from "express";
import { 
    register,
    confirmAccount,
    authenticate,
    forgotPassword,
    checkToken,
    newPassword,
    updateUser
} from "../controllers/User.controller.js"
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", register);
router.get("/confirm/:token", confirmAccount);
router.post("/login", authenticate);
router.post("/forgot-password", forgotPassword); 
router.route("/forgot-password/:token")
    .get(checkToken)
    .post(newPassword);
router.put("/edit", checkAuth, updateUser);

export default router;