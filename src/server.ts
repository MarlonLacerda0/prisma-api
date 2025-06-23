import cors from 'cors';
import express from 'express';
import userRouter from './route/user';
import postRouter from './route/post';



const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.use(cors({
  origin: '*', // ou 'http://localhost:3000' para permitir só o front local
}));
//teste