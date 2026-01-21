import {db} from '../config/db.js'

export const register = async (userData) => {
    const trx = await db.transaction();
    try {
console.log(userData);

        const checkExistingUser = await trx('users')
            .select('u_id', 'name', 'username', 'role')
            .where({ username: userData.username })
            .first();
        
        if (checkExistingUser) {
            console.log(checkExistingUser);
            
            return {checkExistingUser, msg: 'Username already exists' };
        }

        const [newUser] = await trx('users')
            .insert(userData)
            .returning(['u_id', 'name', 'username', 'role']);
        
        await trx.commit();
        return {user: newUser, msg: 'User registered successfully'};


    } catch (error) {
        await trx.rollback();
        console.error('Error in User model register =>', error);
        throw new Error('Error registering user');
    }
}

export const loggingIn = async (username)=>{
    try {
        const userFromDB = await db('users')
        .select('u_id', 'name', 'username', 'role', 'password')
        .where({ username})
        .first();
        
        if(!userFromDB){
           return {msg: 'User not found'};
        }   

        const {password, ...user} = userFromDB;
        return {msg: 'User found', password, user};

    } catch (error) {
        console.error('Error in User model loggingIn =>', error);
        throw new Error('Error logging in user');
    }
}