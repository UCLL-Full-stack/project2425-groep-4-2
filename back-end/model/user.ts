import { Role } from "../types";
import { Console } from "./console";
import { 
    User as UserPrisma,
    Console as ConsolePrisma,
    Game as GamePrisma,
} from "@prisma/client";
import { Game } from "./game";

export class User {
    private id?: number;
    private name: string;
    private email: string;
    private dateOfBirth: Date;
    private blacklisted: boolean;
    private password: string;
    private role: Role;
    private consoles : Console[];

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        dateOfBirth: Date;
        blacklisted: boolean;
        password: string;
        role: Role;
        consoles : Console[];
    }) {
        this.validate(user);

        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.dateOfBirth = user.dateOfBirth;
        this.blacklisted = user.blacklisted;
        this.password = user.password;
        this.role = user.role;
        this.consoles = user.consoles;
    }

    getId() : number | undefined{
        return this.id;
    }

    getName() : string{
        return this.name;
    }

    getEmail() : string{
        return this.email;
    }

    getDateOfBirth() : Date{
        return this.dateOfBirth;
    }

    getPassword() : string{
        return this.password;
    }

    getRole() : Role{
        return this.role;
    }

    getConsoles() : Console[]{
        return this.consoles;
    }

    getBlacklisted() : boolean{
        return this.blacklisted;
    }

    setBlacklisted(status: boolean): void {
        this.blacklisted = status;
    }

    validate(user: {
        name: string;
        email: string;
        dateOfBirth: Date;
        password: string;
        role: Role;
    }) {
        if (!user.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.dateOfBirth) {
            throw new Error('Date of birth is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.name === user.getName() &&
            this.email === user.getEmail() &&
            this.dateOfBirth === user.getDateOfBirth() &&
            this.password === user.getPassword() &&
            this.role === user.getRole() &&
            this.blacklisted === user.getBlacklisted() &&
            this.consoles.every((console, index) => console.equals(user.getConsoles()[index]))
        );
    }

    static from({ id, name, email, dateOfBirth, blacklisted, password, role, consoles }
        : UserPrisma & { consoles: (ConsolePrisma & {games: GamePrisma[]})[]; }) {
        return new User({
            id,
            name,
            email,
            dateOfBirth,
            blacklisted,
            password,
            role: role as Role,
            consoles: consoles.map((console) => Console.from(console)),
        });
    }
}