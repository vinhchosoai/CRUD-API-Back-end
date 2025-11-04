import { Router } from "express";
import * as userController from './user.controller';
import { validateRequest } from "../middlewares/validateRequest";
import { UpdateUserSchema } from "./user.dto";
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.use(protect);

router.put('/:id', validateRequest(UpdateUserSchema), userController.updateUser);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.upgradeRankUser);

export default router;
