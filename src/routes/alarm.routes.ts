import { Router } from 'express';
import { handleAlarmEcho } from '../controllers/alarm.controller';

const router = Router();

router.post('/echo', handleAlarmEcho);

export default router;
