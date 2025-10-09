import express from 'express';
import userRouter from'./api/users/user.route';
import { errorHandler } from './api/middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/',(req, res)=>{
    res.send('Welcome lady & gentalmen')
})
app.use('/users',userRouter);
app.use(errorHandler);

app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});