import express from 'express';
import echoRoutes from './routes/echo.routes';

const app = express();
app.use(express.json());

app.use('/echo', echoRoutes);

export default app;
