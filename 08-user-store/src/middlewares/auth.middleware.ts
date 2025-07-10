import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../config";
import { UserModel } from "../data";
import { UserEntity } from "../domain";

export class AuthMiddleware {
    static async validateJWT(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authorization = req.header('Authorization');
        if (!authorization) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        if (!authorization.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }

        const token = authorization.split(' ')[1] || '';
        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if (!payload) {
                res.status(401).json({ error: 'Invalid token' });
                return;
            }

            const user = await UserModel.findById(payload.id);
            if (!user) {
                res.status(401).json({ error: 'Invalid token - user not found' });
                return;
            }

            req.body.user = UserEntity.fromObject(user);

            next();
        } catch (error) {
            console.log(`Error validating JWT: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
