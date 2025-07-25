import { Router } from "express";
import { handleAlarmEcho, receiveAlarm } from "../controllers/alarm.controller";
import { authenticateStaticToken, combineAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/echo", handleAlarmEcho);
router.post("/incoming", combineAuth, receiveAlarm);

export default router;
