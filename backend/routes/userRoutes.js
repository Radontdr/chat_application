import express from 'express';
import {registerUser,authUser} from '../controllers/userController.js';
import {allUsers} from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';

const router=express.Router();

router.route('/').post(registerUser).get(protect,allUsers);
router.route('/login').post(authUser);
export default router;