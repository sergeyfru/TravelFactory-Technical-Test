import {db} from '../config/db.js'

export const loggingIn = async (username, password)=>{
    const trx = await db.transaction();
    try {
        const user = await trx('users')
        .select('u_id', 'name', 'username', 'role', 'password')
        .where({ username})
        .first();
        
        if(!user){
           return {msg: 'User not found'};
        }   
        // In a real application, I'll hash and salt passwords

        const passwordMatch = (password === user.password); 
        
        if(!passwordMatch){
           return {msg: 'Invalid password'};
        }

        await trx.commit();
        return {msg: 'User found',  user};

    } catch (error) {
        await trx.rollback();
        console.error('Error in User model loggingIn =>', error);
        throw new Error('Error logging in user');
    }
}