
import { loggingIn,register } from "../models/user_model.js";
import bcrypt from 'bcrypt';

export const _register = async (req, res) => {
    const { username, name, password, role="requester"} = req.body;

    try {
        const usernameToLower = username.trim().toLowerCase();
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password + '', salt)

        const newUser = await register({ username: usernameToLower, name, password: hashedPassword, role })
        res.status(200).json(newUser)

    } catch (error) {
        console.log('Users controllers   _register =>', error);
        res.status(404).json({ msg: 'Register failed' })
    }
}

export const _loggingIn = async (req, res) => {
    console.log('-',req.originalUrl);
    const { username, password } = req.body;
    
    try {
        const result = await loggingIn(username.trim().toLowerCase(), password);

        if(result.msg === 'User not found'){
            return  res.status(401).json({ message: 'Invalid credentials' });
        } 
        const passwordMatch = bcrypt.compareSync(password + '', result.password);
        
        if(!passwordMatch){
            return res.status(401).json({ message: 'Invalid credentials' });
        } else {
            res.status(200).json({user: result.user, message: 'Login successful' });
        }
    } catch (error) {
        console.error('Error in User controller _loggingIn =>', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
// res.status(200).json({ msg: 'Logging in endpoint reached' });
}