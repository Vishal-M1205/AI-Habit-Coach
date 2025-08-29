import express from 'express';
import { handleResponse } from '../controller/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/response', handleResponse);

export default aiRouter;
