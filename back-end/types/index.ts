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

export{
    Role,
    NormalInput,
    ManagerInput,
    ReviewerInput,
};