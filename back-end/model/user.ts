import { Role } from "../types";
import { Review } from "./review";
import { Console } from "./console";

export class User {
    private id?: number;
    private name: string;
    private email: string;
    private dateOfBirth: Date;
    private blacklisted: boolean;
    private role: Role;
    private consoles : Console[];
    private reviews : Review[];

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        dateOfBirth: Date;
        blacklisted: boolean;
        role: Role;
        consoles : Console[];
        reviews : Review[];
    }) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.dateOfBirth = user.dateOfBirth;
        this.blacklisted = user.blacklisted;
        this.role = user.role;
        this.consoles = user.consoles;
        this.reviews = user.reviews;
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

    getRole() : Role{
        return this.role;
    }

    getConsoles() : Console[]{
        return this.consoles;
    }

    getReviews() : Review[]{
        return this.reviews;
    }

    getBlacklisted() : boolean{
        return this.blacklisted;
    }

    setBlacklisted(status: boolean): void {
        this.blacklisted = status;
      }
}