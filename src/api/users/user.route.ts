import { Router } from "express";
import * as userController from './user.controller';
import { validateRequest } from "../middlewares/validateRequest";
import { CreateUserSchema, UpdateUserSchema } from "./user.dto";

const router = Router();

router.post('/', validateRequest(CreateUserSchema), userController.createUser);
router.put('/:id',validateRequest(UpdateUserSchema), userController.updateUser);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);

export default router;
