import { Game } from "./game";
import { 
    Review as ReviewPrisma,
    Game as GamePrisma,
} from "@prisma/client";

export class Review {
    private id?: number;
    private stars: number;
    private description: string;
    private game : Game;
    private reviewerId: number

    constructor(review: {
        id?: number;
        stars: number;
        description: string;
        game : Game;
        reviewerId: number;
    }) {
        this.validate(review);

        this.id = review.id;
        this.stars = review.stars;
        this.description = review.description;
        this.game = review.game;
        this.reviewerId = review.reviewerId;
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

    getReviewerId(): number{
        return this.reviewerId;
    }

    validate(review: {
        stars: number;
        description: string;
        game: Game;
        reviewerId: number;
    }) {
        if (!review.stars) {
            throw new Error('Stars is required');
        }
        if (!review.description) {
            throw new Error('Description is required');
        }
        if (!review.game) {
            throw new Error('Game is required');
        }
        if (!review.reviewerId) {
            throw new Error('Reviewer id is required');
        }
    }

    equals(review: Review): boolean {
        return (
            this.id === review.getId() &&
            this.stars === review.getStars() &&
            this.description === review.getDescription() &&
            this.game.equals(review.getGame()) &&
            this.reviewerId === review.getReviewerId()
        );
    }

    static from({ id, stars, description, game, reviewerId}
        : ReviewPrisma & { game: GamePrisma }) {
        return new Review({
            id,
            stars,
            description,
            game: Game.from(game),
            reviewerId: reviewerId,
        });
    }
}