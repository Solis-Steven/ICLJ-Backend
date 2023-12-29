import express from "express";
import { 
    register,
    confirmAccount,
    authenticate,
    forgotPassword,
    checkToken,
    newPassword,
    updateUser,
    getAllUsers,
    profile
} from "../controllers/User.controller.js"
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", register);
router.get("/", checkAuth, getAllUsers);
router.get("/confirm/:token", confirmAccount);
router.post("/login", authenticate);
router.post("/forgot-password", forgotPassword); 
router.route("/forgot-password/:token")
    .get(checkToken)
    .post(newPassword);
router.put("/edit/:id", checkAuth, updateUser);
router.get("/profile", checkAuth, profile)

export default router;