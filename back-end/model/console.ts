import { Game } from "./game";
import { 
    Game as GamePrisma,
    Console as ConsolePrisma,
} from '@prisma/client';

export class Console {
    private id?: number;
    private price: number;
    private name: string;
    private version: string;
    private releaseDate: Date;
    private brand: string;
    private games: Game[];
    private userId: number;

    constructor(console: {
        id?: number;
        price: number
        name: string;
        version: string;
        releaseDate: Date;
        brand: string;
        games: Game[];
        userId: number;
    }) {
        this.validate(console);

        this.id = console.id;
        this.price = console.price;
        this.name = console.name;
        this.version = console.version;
        this.releaseDate = console.releaseDate;
        this.brand = console.brand;
        this.games = console.games;
        this.userId = console.userId;
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

    getUserId(): number{
        return this.userId;
    }

    validate(console: {
        price: number
        name: string;
        version: string;
        releaseDate: Date;
        brand: string;
        games: Game[];
        userId: number;
    }) {
        if (!console.price) {
            throw new Error('Price is required');
        }
        if (!console.name) {
            throw new Error('Name is required');
        }
        if (!console.version) {
            throw new Error('Version is required');
        }
        if (!console.releaseDate) {
            throw new Error('Release date is required');
        }
        if (!console.brand) {
            throw new Error('Brand is required');
        }
        if (!console.games) {
            throw new Error('Games is required');
        }
        if (!console.userId) {
            throw new Error('User id is required');
        }
    }

    equals(console: Console): boolean {
        return (
            this.id === console.getId() &&
            this.price === console.getPrice() &&
            this.name === console.getName() &&
            this.version === console.getVersion() &&
            this.releaseDate === console.getReleaseDate() &&
            this.brand === console.getBrand() &&
            this.games.every((game, index) => game.equals(console.getGames()[index])) &&
            this.userId === console.userId
        );
    }

    static from({ id, price, name, version, releaseDate, brand, games, userId}
        : ConsolePrisma & { games: GamePrisma[] }) {
        return new Console({
            id,
            price,
            name,
            version,
            releaseDate,
            brand,
            games: games.map((game) => Game.from(game)),
            userId,
        });
    }
}