import { Router } from 'express';
import { handleEcho } from '../controllers/echo.controller.js';

const router = Router();

router.post('/', handleEcho);

export default router;
