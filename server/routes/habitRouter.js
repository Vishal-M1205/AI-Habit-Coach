import express from 'express';
import { addHabit, deleteHabit, getHabits, updateHabit , completeHabit, getDashboardStats} from '../controller/habitController.js';

const habitRouter = express.Router();

habitRouter.post('/addHabit',addHabit);
habitRouter.post('/getHabits',getHabits);
habitRouter.post('/updateHabit/:id',updateHabit);
habitRouter.post('/deleteHabit/:id',deleteHabit);
habitRouter.post('/completeHabit',completeHabit);
habitRouter.post('/getDashboardStats',getDashboardStats);

export default habitRouter;