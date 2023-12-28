import { idGenerator } from "../helpers/idGenerator.js";
import { User } from "../models/User.model.js"
import { JWTGenerator } from  "../helpers/JWTGenerator.js"

export const register = async (req, res) => {
    const { email } = req.body;
    const existsUser = await User.findOne({email});

    if(existsUser) {
        const error = new Error("El usuario ya está registrado");
        
        return(res.status(400).json({msg: error.message}));
    }

    try {
        const user = new User(req.body);
        user.token = idGenerator();
        await user.save();

        const {name, token} = user

        res.json({msg: "User Created Correctly, Check your Email to Confirm your Account", 
        user: {email, name,token}})
    } catch (error) {
        if (error.errors) {
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ msg: validationErrors });
        }

        res.status(400).json(`Error: ${error.message}`);
    }
}

export const confirmAccount = async(req, res) => {
    const { token } = req.params;

    const userToConfirm = await User.findOne({token});

    if(!userToConfirm) {
        const error = new Error("El token no es válido");
        return(res.status(404).json({msg: error.message}));
    }

    try {
        userToConfirm.confirmed = true;
        userToConfirm.token = "";
        await userToConfirm.save();
        res.json({msg: "Usuario confirmado correctamente"})
    } catch (error) {
        console.log(error);
    }
}

export const authenticate = async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email});

    if(!user) {
        const error = new Error("El usuario no existe");
        return(res.status(404).json({msg: error.message}));
    }

    if(!user.confirmed) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return(res.status(403).json({msg: error.message}));
    }

    if(await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email,
            role: user.role,
            token: JWTGenerator(user._id)
        })
    } else {
        const error = new Error("La contraseña es incorrecta");
        return(res.status(403).json({msg: error.message}));
    }
}

export const forgotPassword = async(req, res) => {
    const { email } = req.body;

    const user = await User.findOne({email});
    
    if(!user) {
        const error = new Error("El usuario no existe");
        return(res.status(404).json({msg: error.message}));
    }

    try {
        user.token = idGenerator();
        await user.save();

        res.json({msg: "Hemos enviado un email con las instrucciones", token: user.token})
    } catch (error) {
        console.log(error);
    }
}

export const checkToken = async(req, res) => {
    const { token } = req.params;

    const isValidToken = await User.findOne({token});

    if(!isValidToken) {
        const error = new Error("El token no es válido");
        return(res.status(404).json({msg: error.message}));
    }

    res.json({msg: "Token válido y el usuario existe"})
}

export const newPassword = async(req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({token});

    if(!user) {
        const error = new Error("El token no es válido");
        return(res.status(404).json({msg: error.message}));
    }

    try {
        user.password = newPassword;
        user.token = "";
        await user.save();
    
        res.json({msg: "Contraseña modificada correctamente"});
    } catch (error) {
        res.status(500).json({msg: "Error al cambiar la contraseña"});
        console.log(error);
    }
}

export const updateUser = async(req, res) => {
    const { id } = req.params;

    const userToUpdate = await User.findById(id);

    if(!userToUpdate) {
        const error = new Error("El usuario no existe");
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

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export const profile = async(req, res) => {
    const { user } = req;

    res.json(user);
}