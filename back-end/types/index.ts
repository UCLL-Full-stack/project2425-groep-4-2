type Role = 'normal' | 'admin' | 'reviewer';

type UserInput = {
    id?: number;
    name: string;
    email: string;
    dateOfBirth: Date;
    role: Role;
    blacklisted: boolean;
    password: string;
    consoles: ConsoleInput[];
};

type ReviewerInput = {
    id?: number;
    reviews : ReviewInput[];
    user: UserInput;
};

type ReviewInput = {
    id?: number;
    stars: number;
    description: string;
    gameId : number;
    reviewerId: number;
}

type ConsoleInput = {
    id?: number;
    price: number;
    name: string;
    version: string;
    brand: string;
    releaseDate: string;
    games: GameInput[];
    userId: number;
};

type GameInput = {
    id?: number;
    name: string;
    genre: string;
    releaseDate: Date;
    developer: string;
}

type ConsoleGameInput = {
    consoleId: number,
    gameId: number,
}

type AuthenticationResponse = {
    token: string;
    name: string;
    role: string;
    id: number;
    reviewerId: number;
    blacklisted: boolean;
};

export {
    UserInput,
    Role,
    ReviewerInput, 
    ConsoleInput,
    ReviewInput,
    GameInput,
    ConsoleGameInput,
    AuthenticationResponse,
};