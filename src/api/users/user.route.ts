import { Router } from "express";
import * as userController from './user.controller';
import { validate } from "../middlewares/validateRequest";
import { createUserSchema } from "./user.dto";
import { runInContext } from "vm";

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', validate(createUserSchema), userController.createUser);
router.put('/:id', userController.updateUser );
router.delete('/:id', userController.deleteUser);

export default router;