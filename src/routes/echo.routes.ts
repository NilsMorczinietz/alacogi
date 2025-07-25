import { Router } from 'express';
import { handleEcho } from '../controllers/echo.controller';

const router = Router();

router.post('/', handleEcho);

export default router;
