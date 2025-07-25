import express from 'express';
import echoRoutes from './routes/echo.routes';
import alarmRoutes from './routes/alarm.routes';

const app = express();
app.use(express.json());

app.use('/echo', echoRoutes);
app.use('/alarms', alarmRoutes);

export default app;
