import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({ id : user._id}, process.env.JWT_KEY, {expiresIn:'1h'});
}