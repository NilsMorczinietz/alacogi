import { Router } from 'express';
import {
  handleAlarmEcho,
  createAlarm,
  incomingAlarm,
  announceAlarm,
} from '../controllers/alarm.controller';
import { authenticateStaticToken, combineAuth } from '../middleware/auth.middleware';

const router = Router();

router.post('/echo', handleAlarmEcho);

router.post('/', combineAuth, createAlarm);
router.post('/incoming', combineAuth, incomingAlarm);
router.post('/announce', combineAuth, announceAlarm);

export default router;
