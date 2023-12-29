import jwt from "jsonwebtoken";

export const JWTGenerator = (id) => {
    return(jwt.sign({ id }, process.env.JWT_SECRETE, {
        expiresIn: "30d"
    }));
}