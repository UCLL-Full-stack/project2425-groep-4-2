import { 
    Game as GamePrisma,
} from '@prisma/client';

export class Game {
    private id?: number;
    private name: string;
    private genre: string;
    private releaseDate: Date;
    private developer: string;

    constructor(game: {
        id?: number;
        name: string;
        genre: string;
        releaseDate: Date;
        developer: string;
    }) {
        this.validate(game);
        
        this.id = game.id;
        this.name = game.name;
        this.genre = game.genre;
        this.releaseDate = game.releaseDate;
        this.developer = game.developer;
    }

    getId() : number | undefined{
        return this.id;
    }

    getName() : string{
        return this.name;
    }

    getGenre() : string{
        return this.genre;
    }

    getReleaseDate() : Date{
        return this.releaseDate;
    }

    getDeveloper() : string{
        return this.developer;
    }

    validate(game: {
        name: string;
        genre: string;
        releaseDate: Date;
        developer: string;
    }) {
        if (!game.name) {
            throw new Error('Name is required');
        }
        if (!game.genre) {
            throw new Error('Genre is required');
        }
        if (!game.releaseDate) {
            throw new Error('Release date is required');
        }
        if (!game.developer) {
            throw new Error('Developer is required');
        }
    }

    equals(game: Game): boolean {
        return (
            this.id === game.getId() &&
            this.name === game.getName() &&
            this.genre === game.getGenre() &&
            this.releaseDate === game.getReleaseDate() &&
            this.developer === game.getDeveloper()
        );
    }

    static from({ id, name, genre, releaseDate, developer }
        : GamePrisma ) {
        return new Game({
            id,
            name,
            genre,
            releaseDate,
            developer,
        });
    }
}