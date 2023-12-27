import { idGenerator } from "../helpers/idGenerator.js";
import { User } from "../models/User.model.js"

export const register = async (req, res) => {
    const { email } = req.body;
    const existsUser = await User.findOne({email});

    if(existsUser) {
        const error = new Error("User already registered");
        
        return(res.status(400).json({msg: error.message}));
    }

    try {
        const user = new User(req.body);
        user.token = idGenerator();
        await user.save();

        res.json({msg: "User Created Correctly, Check your Email to Confirm your Account"})
    } catch (error) {
        res.status(400).json(`Error: ${error.message}`);
    }
}