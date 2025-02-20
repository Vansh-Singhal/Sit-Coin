import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({account_number : user.account_number, id : user._id, fullname : user.fullname, contact: user.contact}, process.env.JWT_KEY, {expiresIn:'1h'});
}