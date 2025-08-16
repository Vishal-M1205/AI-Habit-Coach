import express from 'express';
import { addHabit, deleteHabit, getHabits, updateHabit } from '../controller/habitController.js';

const habitRouter = express.Router();

habitRouter.post('/addHabit',addHabit);
habitRouter.post('/getHabits',getHabits);
habitRouter.post('/updateHabit/:id',updateHabit);
habitRouter.post('/deleteHabit/:id',deleteHabit);

export default habitRouter;