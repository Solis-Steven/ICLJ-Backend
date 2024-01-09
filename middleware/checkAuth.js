import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js"; 

export const checkAuth = async (req, res, next) => {
    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRETE);
            const userData = await User.findById(decoded.id);
            
            if(userData.role === "Administrador") {
                req.user = userData;
                return(next());
            } else {
                res.status(409).send({msg: "No tienes permisos"})
            }
        } catch (error) {
            console.log(error);
            return(res.status(404).json({msg: "Hubo un error"}));
        }
    }

    if(!token) {
        const error = new Error("El tóken no es válido");
        return(res.status(401).json({msg: error.message}));
    }

    next();
}