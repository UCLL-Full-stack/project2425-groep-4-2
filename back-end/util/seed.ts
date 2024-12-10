// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';
import { id } from 'date-fns/locale';
import { connect } from 'http2';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.console.deleteMany();
    await prisma.review.deleteMany();
    await prisma.game.deleteMany();
    await prisma.reviewer.deleteMany();
    await prisma.user.deleteMany();

    const stardewValley = await prisma.game.create({
        data: {
            name: 'Stardew Valley',
            genre: 'Open world',
            releaseDate: set(new Date(), { hours: 10, minutes: 45 }),
            developer: 'Harry',
        },
    });

    const BOTW = await prisma.game.create({
        data: {
            name: 'The legend of zelda BOTW',
            genre: 'Relax',
            releaseDate: set(new Date(), { hours: 10, minutes: 45 }),
            developer: 'Harry',
        },
    });

    const darkSouls = await prisma.game.create({
        data: {
            name: 'Dark Souls',
            genre: 'Soulslike',
            releaseDate: set(new Date(), { hours: 10, minutes: 45 }),
            developer: 'Not Harry',
        },
    });

    const admin = await prisma.user.create({
        data: {
            name: 'admin',
            password: await bcrypt.hash('admin123', 12),
            dateOfBirth: set(new Date(), { hours: 10, minutes: 45 }),
            blacklisted: false,
            email: 'admin@gamelib.be',
            role: 'admin',
        },
    });

    const reviewer1 = await prisma.reviewer.create({
        data: {
            user: {
                create: {
                    name: 'Kevin',
                    password: await bcrypt.hash('kevin123', 12),
                    dateOfBirth: set(new Date(), { hours: 10, minutes: 45 }),
                    blacklisted: false,
                    email: 'kevin@gamelib.be',
                    role: 'reviewer',
                },
            },
        },
        include: {
            user: true,
        },
    });

    const normalUser = await prisma.user.create({
        data: {
            name: 'Harry',
            password: await bcrypt.hash('harry123', 12),
            dateOfBirth: set(new Date(), { hours: 10, minutes: 45 }),
            blacklisted: false,
            email: 'harry@gamelib.be',
            role: 'normal',
        },
    });

    const playstation = await prisma.console.create({
        data: {
            price: 699,
            name: 'Playstation',
            version: "5 slim",
            releaseDate: set(new Date(), { hours: 10, minutes: 45 }),
            brand: "Sony",
            games: {
                connect: [{ id: stardewValley.id }, {id: darkSouls.id}],
            },
            user: {
                connect: { id: normalUser.id },
            },
        },
    });

    const xBox = await prisma.console.create({
        data: {
            price: 699,
            name: 'XBOX',
            version: "ONE X",
            releaseDate: set(new Date(), { hours: 10, minutes: 45 }),
            brand: "Microsoft",
            games: {
                connect: [{ id: darkSouls.id }, {id: stardewValley.id}],
            },
            user: {
                connect: { id: reviewer1.user.id },
            },
        },
    });

    const nintendoSwitch = await prisma.console.create({
        data: {
            price: 699,
            name: 'Switch',
            version: "Lite",
            releaseDate: set(new Date(), { hours: 10, minutes: 45 }),
            brand: "Nintendo",
            games: {
                connect: [{ id: stardewValley.id }, {id: BOTW.id }],
            },
            user: {
                connect: { id: reviewer1.user.id },
            },
        },
    });

    

    await prisma.review.create({
        data: {
            stars: 5,
            description: 'Very nice and relaxing game!',
            game: {
                connect: { id: stardewValley.id },
            },
            reviewer: {
                connect: { id: reviewer1.id },
            },
        },
    });

    await prisma.review.create({
        data: {
            stars: 5,
            description: 'Difficult game, I like it!',
            game: {
                connect: { id: darkSouls.id },
            },
            reviewer: {
                connect: { id: reviewer1.id },
            },
        },
    });

    await prisma.review.create({
        data: {
            stars: 5,
            description: 'The scenery is beautiful!',
            game: {
                connect: { id: BOTW.id },
            },
            reviewer: {
                connect: { id: reviewer1.id },
            },
        },
    });

   
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
