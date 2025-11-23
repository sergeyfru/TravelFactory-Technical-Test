import { getAllVacations, addVacationRequest, getVacationByUserId, updateVacationRequestStatus } from "../models/vacation_model.js";

export const _getAllVacations = async (req, res) => {
    console.log('-',req.originalUrl);
    
    try {
        const vacations =  await getAllVacations();
        res.status(200).json(vacations);
    } catch (error) {
        console.error('Error in Vacation controller _getAllVacations =>', error);
        res.status(500).json({ message: 'Error fetching vacations' });
    }
};

export const _getVacationByUserId = async (req, res) => {
    console.log('-',req.originalUrl);
    const { u_id } = req.params;
    try {
        const vacations =  await getVacationByUserId(u_id);
        res.status(200).json(vacations);
    } catch (error) {
        console.error('Error in Vacation controller _getVacationByUserId =>', error);
        res.status(500).json({ message: 'Error fetching vacations for user' });
    }
}

export const _addVacationRequest = async (req, res) => {
    console.log('-',req.originalUrl);
    const { u_id, start_date, end_date, reason } = req.body;    

    try {
        const newRequest = await addVacationRequest(u_id, start_date, end_date, reason);
        res.status(201).json(newRequest);
    } catch (error) {
        console.error('Error in Vacation controller _addVacationRequest =>', error);
        res.status(500).json({ message: 'Error adding vacation request' });
    }
}

export const _updateVacationRequestStatus = async (req, res) => {
    console.log('-',req.originalUrl);
    
    const { v_id, status, comments } = req.body;    

    try {
        const updatedRequest = await updateVacationRequestStatus(v_id, status, comments);
        res.status(200).json(updatedRequest);
        // res.status(200).json({ message: 'Vacation request status updated successfully' });
    } catch (error) {
        console.error('Error in Vacation controller _updateVacationRequestStatus =>', error);
        res.status(500).json({ message: 'Error updating vacation request status' });
    }
}   