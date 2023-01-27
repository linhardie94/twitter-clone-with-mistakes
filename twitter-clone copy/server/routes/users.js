import express from 'express';
import { getUser, update, deleteUser, follow, unFollow } from '../controller/user.js';
import { verifyToken } from '../verifyToken.js';

//importing routers for API requests
const router = express.Router();

//updating user
router.put('/:id', verifyToken, update)

//get user
router.get('/find/:id', getUser);

//delete user
router.delete('/:id', verifyToken, deleteUser);

//follow
router.put("/follow/:id", verifyToken, follow);

//unfollow
router.put("/unfollow/:id", verifyToken, unFollow);

export default router;