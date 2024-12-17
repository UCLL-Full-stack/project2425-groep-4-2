import jwt from 'jsonwebtoken';
import { Role } from '../types';

const generateJwtToken = ({ name, role, id, reviewerId }: { name: string; role: Role; id: number, reviewerId: number }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'gamelib_app' };

    try {
        return jwt.sign({ name, role, id, reviewerId }, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export { generateJwtToken };
