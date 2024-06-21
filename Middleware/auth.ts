const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
    user?: string | object;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (e) {
        console.error('JWT verification error:', e);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;
