import { Game } from "./game";

export class Console {
    private id?: number;
    private price: number;
    private name: string;
    private version: string;
    private releaseDate: Date;
    private brand: string;
    private games: Game[];

    constructor(console: {
        id?: number;
        price: number
        name: string;
        version: string;
        releaseDate: Date;
        brand: string;
        games: Game[];
    }) {
        this.id = console.id;
        this.price = console.price;
        this.name = console.name;
        this.version = console.version;
        this.releaseDate = console.releaseDate;
        this.brand = console.brand;
        this.games = console.games;
    }

    getId() : number | undefined{
        return this.id;
    }

    getPrice() : number{
        return this.price;
    }

    getName() : string{
        return this.name;
    }

    getVersion() : string{
        return this.version;
    }

    getReleaseDate() : Date{
        return this.releaseDate;
    }

    getBrand() : string{
        return this.brand;
    }

    getGames() : Game[]{
        return this.games;
    }
}