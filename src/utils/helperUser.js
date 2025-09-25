import jwt from 'jsonwebtoken';

export const generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });
}