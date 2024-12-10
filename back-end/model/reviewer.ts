import { Review } from "./review";
import { 
    Reviewer as ReviewerPrisma, 
    Review as ReviewPrisma,
    User  as UserPrisma,
    Game as GamePrisma,
    Console as ConsolePrisma,
} from "@prisma/client";
import { User } from "./user";

export class Reviewer {
    private id?: number;
    private reviews : Review[];
    private user : User;

    constructor(reviewer: {
        id?: number;
        reviews : Review[];
        user: User;
    }) {
        this.validate(reviewer);

        this.id = reviewer.id;
        this.reviews = reviewer.reviews;
        this.user = reviewer.user;
    }

    getId() : number | undefined{
        return this.id;
    }

    getReviews() : Review[]{
        return this.reviews;
    }

    getUser(): User{
        return this.user;
    }

    validate(reviewer: {
        user: User,
    }) {
        if (!reviewer.user) {
            throw new Error('User is required');
        }
    }

    equals(reviewer: Reviewer): boolean {
        return (
            this.getId() === reviewer.getId() &&
            this.user.equals(reviewer.getUser()) &&
            this.reviews.every((review, index) => review.equals(reviewer.getReviews()[index]))
        );
    }

    static from({ id, reviews, user, }
        : ReviewerPrisma & { reviews: (ReviewPrisma & {game: GamePrisma})[]; user: (UserPrisma & {consoles: (ConsolePrisma & {games: GamePrisma[]})[]}) }) {
        return new Reviewer({
            id,
            reviews: reviews.map((review) => Review.from(review)),
            user: User.from(user),
        });
    }
}