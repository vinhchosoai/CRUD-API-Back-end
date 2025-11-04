import express from 'express';
import userRouter from './api/users/user.route';
import authRouter from './api/auth/auth.routes';
import { errorHandler } from './api/middlewares/errorHandler';

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Server running on http://localhost:${port}`));
