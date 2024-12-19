import reviewerDb from '../../repository/reviewer.db';
import { Reviewer } from '../../model/reviewer';
import { User } from '../../model/user';
import reviewerService from '../../service/reviewer.service';
import { Review } from '../../model/review';
import { Game } from '../../model/game';

let mockReviewerDbGetAllReviewers: jest.Mock;
let mockReviewerDbGetReviewerById: jest.Mock;
let mockReviewerDbGetReviewerByUserId: jest.Mock;

beforeEach(() => {
    mockReviewerDbGetAllReviewers = jest.fn();
    mockReviewerDbGetReviewerById = jest.fn();
    mockReviewerDbGetReviewerByUserId = jest.fn();

    reviewerDb.getAllReviewers = mockReviewerDbGetAllReviewers;
    reviewerDb.getReviewerById = mockReviewerDbGetReviewerById;
    reviewerDb.getReviewerByUserId = mockReviewerDbGetReviewerByUserId;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given valid reviewers, when getting all reviewers, then reviewers are returned', async () => {
        // given
        const reviewers = [
            new Reviewer({
                id: 1,
                reviews: [new Review({ id: 1, stars: 5, description: 'Great game', game:  new Game({id: 1, name: 'Game 1', genre: 'RPG', releaseDate: new Date('2022-01-01'), developer: 'Phony'}), reviewerId: 1 })],
                user: new User({
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    dateOfBirth: new Date('1990-01-01'),
                    blacklisted: false,
                    password: 'securepassword',
                    role: 'reviewer',
                    consoles: [],
                }),
            }),
            new Reviewer({
                id: 2,
                reviews: [],
                user: new User({
                    id: 2,
                    name: 'Jane Smith',
                    email: 'jane.smith@example.com',
                    dateOfBirth: new Date('1992-01-01'),
                    blacklisted: false,
                    password: 'securepassword2',
                    role: 'reviewer',
                    consoles: [],
                }),
            }),
        ];

        mockReviewerDbGetAllReviewers.mockResolvedValue(reviewers);

        // when
        const result = await reviewerService.getAllReviewers();

        // then
        expect(result).toEqual(reviewers);
        expect(mockReviewerDbGetAllReviewers).toHaveBeenCalledTimes(1);
    });

    test('given valid id, when getting reviewer by id, then reviewer is returned', async () => {
        // given
        const reviewer = new Reviewer({
            id: 1,
            reviews: [new Review({ id: 1, stars: 5, description: 'Great game', game:  new Game({id: 1, name: 'Game 1', genre: 'RPG', releaseDate: new Date('2022-01-01'), developer: 'Phony'}), reviewerId: 1 })],
            user: new User({
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                dateOfBirth: new Date('1990-01-01'),
                blacklisted: false,
                password: 'securepassword',
                role: 'reviewer',
                consoles: [],
            }),
        });

        mockReviewerDbGetReviewerById.mockResolvedValue(reviewer);

        // when
        const result = await reviewerService.getReviewerById(1);

        // then
        expect(result).toEqual(reviewer);
        expect(mockReviewerDbGetReviewerById).toHaveBeenCalledWith({ id: 1 });
        expect(mockReviewerDbGetReviewerById).toHaveBeenCalledTimes(1);
    });

    test('given invalid id, when getting reviewer by id, then error is thrown', async () => {
        // given
        mockReviewerDbGetReviewerById.mockResolvedValue(null);

        // when
        await expect(reviewerService.getReviewerById(99))
            .rejects.toThrow('Reviewer with id 99 does not exist.');

        // then
        expect(mockReviewerDbGetReviewerById).toHaveBeenCalledWith({ id: 99 });
        expect(mockReviewerDbGetReviewerById).toHaveBeenCalledTimes(1);
    });

    test('given valid userId, when getting reviewer by userId, then reviewer is returned', async () => {
        // given
        const reviewer = new Reviewer({
            id: 1,
            reviews: [],
            user: new User({
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                dateOfBirth: new Date('1990-01-01'),
                blacklisted: false,
                password: 'securepassword',
                role: 'reviewer',
                consoles: [],
            }),
        });

        mockReviewerDbGetReviewerByUserId.mockResolvedValue(reviewer);

        // when
        const result = await reviewerService.getReviewerByUserId(1);

        // then
        expect(result).toEqual(reviewer);
        expect(mockReviewerDbGetReviewerByUserId).toHaveBeenCalledWith({ userId: 1 });
        expect(mockReviewerDbGetReviewerByUserId).toHaveBeenCalledTimes(1);
    });

    test('given invalid userId, when getting reviewer by userId, then error is thrown', async () => {
        // given
        mockReviewerDbGetReviewerByUserId.mockResolvedValue(null);

        // when
        await expect(reviewerService.getReviewerByUserId(99))
            .rejects.toThrow('Reviewer with id 99 does not exist.');

        // then
        expect(mockReviewerDbGetReviewerByUserId).toHaveBeenCalledWith({ userId: 99 });
        expect(mockReviewerDbGetReviewerByUserId).toHaveBeenCalledTimes(1);
    });

