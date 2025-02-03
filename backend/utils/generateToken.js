import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({email : user.email, role : user.role, id : user._id}, process.env.JWT_KEY, {expiresIn:'1d'});
}