import express from "express";
import { authenticated } from "../middleware/checkAuth.js";
import { getUser, register, login, logout } from "../controllers/auth.js";
import { getAbout } from "../controllers/about.js";

const router = express.Router();

router.get('/about', getAbout);
router.post('/register', register);
router.post('/login', login);
router.get('/user', authenticated, getUser);
router.delete('/logout', logout);

export default router;