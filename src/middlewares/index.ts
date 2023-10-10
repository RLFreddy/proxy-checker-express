import { Request, Response, NextFunction } from 'express';
import { ValidationResult } from 'joi';

const joiValidatorMiddleware = <T>(callback: (payload: T) => ValidationResult<T>) => (req: Request, res: Response, next: NextFunction) => {
    if(req.method === 'POST') {
        const payload = req.body as T;
        const { error } = callback(payload);
        if(error) {
            const errors = error.details.map(({ context }) => `key Error => ${context!.key}`);
            return res.status(400).send({
                message: 'Bad Request',
                errors,
            });
        }
    }
    next();
};

export {
    joiValidatorMiddleware
};