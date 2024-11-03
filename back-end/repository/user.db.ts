import { Console } from '../model/console';
import { Game } from '../model/game';
import { Review } from '../model/review';
import { User } from '../model/user';

const gameOne = new Game({
    id: 1, 
    name: "Stardew valley", 
    genre: "Relax", 
    releaseDate: new Date(2021, 11, 17), 
    developer: "Harry", 
    consoles: []
});

const gameTwo = new Game({
    id: 2, name: "The legend of zelda BOTW", 
    genre: "Open world", 
    releaseDate: new Date(2021, 11, 17), 
    developer: "Harry", 
    consoles: []
})

const gameThree = new Game({
    id: 3, 
    name: "Dark Souls", 
    genre: "Soulslike", 
    releaseDate: new Date(2021, 11, 17), 
    developer: "Not Harry", 
    consoles: []
})

const allGames = [
    gameOne,
    gameTwo,
    gameThree,
]

const reviewOne = new Review({
    id: 1,
    stars: 5,
    description: 'Very relaxing game',
    game: gameOne,
})

const reviewTwo = new Review({
    id: 2,
    stars: 4,
    description: 'Nice scenery',
    game: gameTwo,
})

const reviewThree = new Review({
    id: 3,
    stars: 3,
    description: 'Very difficult game',
    game: gameThree
})

const reviewsUserOne = [
    reviewOne,
    reviewTwo,
];

const reviewsUserTwo = [
    reviewThree,
];

const consoleOne = new Console({
    id: 1,
    price: 500,
    name: "Playstation",
    version: "4 pro",
    releaseDate: new Date(2021, 11, 17),
    brand: "Sony",
    games: [gameOne],
})

const consoleTwo = new Console({
    id: 2,
    price: 600,
    name: "X box",
    version: "One X",
    releaseDate: new Date(2021, 11, 17),
    brand: "Microsoft",
    games: allGames,
})


const consolesUserOne = [
    consoleOne,
]

const consolesUserTwo = [
    consoleTwo,
]



const users = [
    new User({
        id: 1,
        name: "Harry",
        email: "harry@outlook.com",
        dateOfBirth: new Date(2021, 11, 17),
        role: "normal",
        consoles: consolesUserOne,
        reviews: reviewsUserOne,
        
    }),
    new User({
        id: 2,
        name: "Not Harry",
        email: "notharry@gmail.com",
        dateOfBirth: new Date(2021, 11, 17),
        role: "normal",
        consoles: consolesUserTwo,
        reviews: reviewsUserTwo,
    }),
];

const getAllUsers = (): User[] => users;

const getUsersById = ({ id }: { id: number }): User | null => {
    return users.find((user) => user.getId() === id) || null;
};

export default {
    getAllUsers,
    getUsersById,
};
