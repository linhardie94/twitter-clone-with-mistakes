import express from 'express';
import { signup, signin } from '../controller/auth.js';

const router = express.Router();

//post request to sign up a user
router.post('/signup', signup);
router.post('/signin', signin);

export default router;