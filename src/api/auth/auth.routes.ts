import { Router } from 'express';
import * as authController from './auth.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { CreateUserSchema } from '../users/user.dto';
import { LoginSchema } from './auth.dto';

const router = Router();

router.post('/register', validateRequest(CreateUserSchema), authController.register);
router.post('/login', validateRequest(LoginSchema), authController.login);

export default router;
