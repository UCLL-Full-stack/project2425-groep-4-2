export class Game {
    private id?: number;
    private name: string;
    private genre: string;
    private releaseDate: Date;
    private developer: string;
    private consoles : Console[];

    constructor(game: {
        id?: number;
        name: string;
        genre: string;
        releaseDate: Date;
        developer: string;
        consoles: Console[];
    }) {
        this.id = game.id;
        this.name = game.name;
        this.genre = game.genre;
        this.releaseDate = game.releaseDate;
        this.developer = game.developer;
        this.consoles = game.consoles;
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

    getConsoles() : Console[]{
        return this.consoles;
    }
}