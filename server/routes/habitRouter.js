import express from 'express';
import { addHabit, deleteHabit, getHabits, updateHabit , completeHabit, getDashboardStats, chart, getHabitStats} from '../controller/habitController.js';

const habitRouter = express.Router();

habitRouter.post('/addHabit',addHabit);
habitRouter.post('/getHabits',getHabits);
habitRouter.post('/updateHabit/:id',updateHabit);
habitRouter.post('/deleteHabit/:id',deleteHabit);
habitRouter.post('/completeHabit',completeHabit);
habitRouter.post('/getDashboardStats',getDashboardStats);
habitRouter.post('/chart',chart);
habitRouter.post('/getHabitStats',getHabitStats);

export default habitRouter;