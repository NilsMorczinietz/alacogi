import { Router } from 'express';
import {
  handleAlarmEcho,
  createAlarm,
  incomingAlarm,
  announceAlarm
} from '../controllers/alarm.controller.js';
import { authenticateStaticToken, combineAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/echo', handleAlarmEcho);

router.post('/', combineAuth, createAlarm);
router.post('/incoming', combineAuth, incomingAlarm);
router.post('/announce', combineAuth, announceAlarm);

export default router;
