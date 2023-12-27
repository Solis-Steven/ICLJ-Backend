import { idGenerator } from "../helpers/idGenerator.js";
import { User } from "../models/User.model.js"
import { JWTGenerator } from  "../helpers/JWTGenerator.js"

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

export const confirmAccount = async(req, res) => {
    const { token } = req.params;

    const userToConfirm = await User.findOne({token});

    if(!userToConfirm) {
        const error = new Error("The token is not valid");
        return(res.status(404).json({msg: error.message}));
    }

    try {
        userToConfirm.confirmed = true;
        userToConfirm.token = "";
        await userToConfirm.save();
        res.json({msg: "User confirmed successfully"})
    } catch (error) {
        console.log(error);
    }
}

export const authenticate = async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email});

    if(!user) {
        const error = new Error("The user doesn't exists");
        return(res.status(404).json({msg: error.message}));
    }

    if(!user.confirmed) {
        const error = new Error("Your account has not been confirmed");
        return(res.status(403).json({msg: error.message}));
    }

    if(await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email,
            token: JWTGenerator(user._id)
        })
    } else {
        const error = new Error("The password is not correct");
        return(res.status(403).json({msg: error.message}));
    }
}

export const forgotPassword = async(req, res) => {
    const { email } = req.body;

    const user = await User.findOne({email});
    
    if(!user) {
        const error = new Error("The user doesn't exists");
        return(res.status(404).json({msg: error.message}));
    }

    try {
        user.token = idGenerator();
        await user.save();

        res.json({msg: "We have sent an email with instructions"})
    } catch (error) {
        console.log(error);
    }
}

export const checkToken = async(req, res) => {
    const { token } = req.params;

    const isValidToken = await Usuario.findOne({token});

    if(!isValidToken) {
        const error = new Error("The token it not valid");
        return(res.status(404).json({msg: error.message}));
    }

    res.json({msg: "Token valid and user exists"})
}

export const newPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({token});

    if(!user) {
        const error = new Error("The token is not valid");
        return(res.status(404).json({msg: error.message}));
    }

    try {
        user.password = password;
        user.token = "";
        await user.save();
    
        res.json({msg: "Password modified succesfully"});
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async(req, res) => {
    const { id } = req.params;

    const userToUpdate = await User.findById(id);

    if(!userToUpdate) {
        const error = new Error("The user doesn't exists");
        return(res.status(404).json({msg: error.message}));
    }

    const {name, phone, address, role} = req.body
    
    userToUpdate.name = name || userToUpdate.name;
    userToUpdate.phone = phone || userToUpdate.phone;
    userToUpdate.address = address || userToUpdate.address;
    userToUpdate.role = role || userToUpdate.role;

    try {
        const userSaved = await userToUpdate.save();
        res.json(userSaved);
    } catch (error) {
        res.status(500).json({msg: "Internal Server Error"})
    }
}