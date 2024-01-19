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
    profile,
    changeState
} from "../controllers/User.controller.js"
import { checkAuth } from "../middleware/checkAuth.js";
import { checkUsers } from "../middleware/checkUsers.js";

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
router.get("/profile", checkUsers, profile);
router.put("/change-state/:id", checkAuth, changeState);

export default router;