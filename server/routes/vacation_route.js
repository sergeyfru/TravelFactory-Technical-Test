import express from "express";

import { _getAllVacations,_addVacationRequest, _getVacationByUserId, _updateVacationRequestStatus } from "../controllers/vacation_controller.js";  

export const vacationRouter = express.Router();

vacationRouter.get('/allvacations', _getAllVacations);
vacationRouter.get('/vacations/:u_id', _getVacationByUserId);
vacationRouter.post('/addvacationrequest', _addVacationRequest);    
vacationRouter.put('/updatevacationrequeststatus', _updateVacationRequestStatus);