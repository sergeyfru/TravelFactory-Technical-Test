import { loggingIn } from "../models/user_model.js";

export const _loggingIn = async (req, res) => {
    console.log('-',req.originalUrl);
    const { username, password } = req.body;
    
    try {
        const result = await loggingIn(username, password);
        if(result.msg === 'User not found'){
            return  res.status(404).json({ message: 'User not found' });
        } else if(result.msg === 'Invalid password'){
            return res.status(401).json({ message: 'Invalid password' });
        } else if(result.msg === 'User found'){
            res.status(200).json(result.user);
        }
    } catch (error) {
        console.error('Error in User controller _loggingIn =>', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
// res.status(200).json({ msg: 'Logging in endpoint reached' });
}