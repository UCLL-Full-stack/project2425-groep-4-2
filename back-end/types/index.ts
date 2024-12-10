type Role = 'normal' | 'admin' | 'reviewer';

type UserInput = {
    id?: number;
    name: string;
    email: string;
    dateOfBirth: Date;
    role: Role;
    blacklisted: boolean;
};

type ReviewerInput = {
    id?: number;
    reviews : ReviewInput[];
};

type ReviewInput = {
    id?: number;
    stars: number;
    description: string;
    game : GameInput;
    reviewer: ReviewerInput;
}

type ConsoleInput = {
    id?: number;
    price: number;
    name: string;
    version: string;
    brand: string;
    releaseDate: string;
};

type GameInput = {
    id?: number;
    name: string;
    genre: string;
    releaseDate: Date;
    developer: string;
    consoles : ConsoleInput[];
}

export {
    UserInput,
    Role,
    ReviewerInput, 
    ConsoleInput,
    ReviewInput,
    GameInput,
};