import express from 'express';
import echoRoutes from './routes/echo.routes.js';
import alarmRoutes from './routes/alarm.routes.js';

const app = express();
app.use(express.json());

app.use('/echo', echoRoutes);
app.use('/alarms', alarmRoutes);

export default app;
