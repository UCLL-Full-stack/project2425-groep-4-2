type Role = 'normal' | 'manager' | 'reviewer';

type UserInput = {
    id?: number;
    name: string;
    email: string;
    dateOfBirth: Date;
    role: Role;
};

type NormalInput = {
    
};

type ManagerInput = {
    
};

type ReviewerInput = {
    
};

type ConsoleInput = {
    id?: number;
    price: number;
    name: string;
    version: string;
    brand: string;
    releaseDate: string;
};

export {
    UserInput,
    Role,
    NormalInput,
    ManagerInput,
    ReviewerInput, 
    ConsoleInput,
};