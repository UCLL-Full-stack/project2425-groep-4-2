import { Console } from '../model/console';
import { Game } from '../model/game';
import { Review } from '../model/review';
import { User } from '../model/user';

const gameOne = new Game({
    id: 1, 
    name: "Stardoom valley", 
    genre: "Souls like", 
    releaseDate: new Date(2021, 11, 17), 
    developer: "Nick", 
    consoles: []
});

const gameTwo = new Game({
    id: 2, name: "The legend of honda", 
    genre: "Open world racing", 
    releaseDate: new Date(2021, 11, 17), 
    developer: "Nick2", 
    consoles: []
})

const gameThree = new Game({
    id: 3, 
    name: "Starduck crusaders", 
    genre: "Beat em up", 
    releaseDate: new Date(2021, 11, 17), 
    developer: "Nick3", 
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
    description: 'Game where start falls to doomfish',
    game: gameOne,
})

const reviewTwo = new Review({
    id: 2,
    stars: 3,
    description: 'I do no know what this is about',
    game: gameTwo,
})

const reviewThree = new Review({
    id: 3,
    stars: 3,
    description: 'Ducks fighting with ghosts',
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
    name: "Slaystation",
    version: "9 pro",
    releaseDate: new Date(2021, 11, 17),
    brand: "Bony",
    games: [gameOne],
})

const consoleTwo = new Console({
    id: 2,
    name: "Susbox",
    version: "Two X",
    releaseDate: new Date(2021, 11, 17),
    brand: "GigaHard",
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
        email: "barry@toverstok.gg",
        dateOfBirth: new Date(2021, 11, 17),
        role: "normal",
        consoles: consolesUserOne,
        reviews: reviewsUserOne,
        
    }),
    new User({
        id: 2,
        name: "Henry",
        email: "joe@toverstok.gg",
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
