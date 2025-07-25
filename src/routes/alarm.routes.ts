import { Router } from "express";
import { handleAlarmEcho, receiveAlarm } from "../controllers/alarm.controller";
import { authenticateStaticToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/echo", handleAlarmEcho);
router.post("/incoming", authenticateStaticToken, receiveAlarm);

export default router;
