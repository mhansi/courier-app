import express from 'express';
import { register, login, getUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user/:id', getUser);

export default router;
