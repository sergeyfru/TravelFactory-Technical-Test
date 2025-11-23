import {db} from '../config/db.js';

export const getAllVacations = async () => {
    try {
        const vacations = await db('users as u')
        .join('vacation_requests as v', 'v.u_id', 'u.u_id')
        .select(
            'u.u_id',
            'u.name',
            'u.username',
            'v.v_id',
            'v.start_date',
            'v.end_date',
            'v.reason',
            'v.status',
            'v.comments',
            'v.created_at'
        )
        .orderBy('u.username','asc')
        .orderBy('v.created_at')

        return vacations;
        
    } catch (error) {
        console.error('Error in Vacation models getAllVacations =>', error);
        throw new Error('Error in Vacation models getAllVacations')
    }
};

export const getVacationByUserId = async (u_id) => {
    try {
        const vacations = await db('users as u')
        .join('vacation_requests as v', 'v.u_id', 'u.u_id')
        .select(
            'u.u_id',
            'u.name',
            'u.username',
            'v.v_id',
            'v.start_date',
            'v.end_date',
            'v.reason',
            'v.status',
            'v.comments',
            'v.created_at'
        )
        .where('u.u_id', u_id)
        .orderBy('v.status','asc')
        .orderBy('v.start_date');

        return vacations;
        
    } catch (error) {
        console.error('Error in Vacation models getVacationByUserId =>', error);
        throw new Error('Error in Vacation models getVacationByUserId')
    }
};

export const addVacationRequest = async (u_id, start_date, end_date, reason) => {
    const trx = await db.transaction();
    try {
        const [newRequest] = await trx('vacation_requests')
            .insert({
                u_id,
                start_date,
                end_date,
                reason,
                status: 'pending',
            })
            .returning(['u_id', 'v_id', 'start_date', 'end_date', 'reason', 'status', 'comments', 'created_at']);
        await trx.commit();
        return newRequest;
    } catch (error) {
        trx.rollback();
        console.error('Error in Vacation models addVacationRequest =>', error);
        throw new Error('Error in Vacation models addVacationRequest')
    }
}

export const updateVacationRequestStatus = async (v_id, status, comments) => {
    const trx = await db.transaction();
    try {
        const [updatedRequest] = await trx('vacation_requests')
            .where({ v_id })
            .update({
                status,
                comments,
            })
            .returning(['u_id', 'v_id', 'start_date', 'end_date', 'reason', 'status', 'comments', 'created_at']);
        await trx.commit();
        return updatedRequest;
    } catch (error) {
        trx.rollback();
        console.error('Error in Vacation models updateVacationStatus =>', error);
        throw new Error('Error in Vacation models updateVacationStatus')
    }
};
