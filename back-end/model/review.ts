import { Game } from "./game";

export class Review {
    private id?: number;
    private stars: number;
    private description: string;
    private game : Game;

    constructor(review: {
        id?: number;
        stars: number;
        description: string;
        game : Game;
    }) {
        this.id = review.id;
        this.stars = review.stars;
        this.description = review.description;
        this.game = review.game;
    }

    getId() : number | undefined{
        return this.id;
    }

    getStars() : number{
        return this.stars;
    }

    getDescription() : string{
        return this.description;
    }

    getGame() : Game{
        return this.game;
    }
}