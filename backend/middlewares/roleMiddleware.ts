import { Request, Response, NextFunction } from 'express';
import { Role, TokenUser } from '../models/Auth';

export const requireRole = (role: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user: TokenUser = (req as any).user;

        if (user?.role !== role) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }
        next();
    };
};
