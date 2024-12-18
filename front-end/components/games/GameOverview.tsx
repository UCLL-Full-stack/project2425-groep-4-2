import { Game } from '@/types';
import React from 'react';
//import AddGame from './AddGame';
import GameService from '@/services/GameService';

type Props = {
  games: Array<Game>;
  onDeleteGame: (game: Game) => void;
  onAddReview: (game: Game) => void;
};

const GameOverview: React.FC<Props> = ({ games, onDeleteGame, onAddReview }: Props) => {
  return (
    <>
      {games && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Genre</th>
              <th scope="col">Developer</th>
              <th scope="col">Release date</th>
            </tr>
          </thead>
          <tbody>
            {games.length > 0 ? (
              games.map((game, index) => (
                <tr key={index}>
                  <td>{game.id}</td>
                  <td>{game.name}</td>
                  <td>{game.genre}</td>
                  <td>{game.developer}</td>
                  <td>
                    {game.releaseDate
                    ? new Date(game.releaseDate).toLocaleDateString('en-GB') 
                    : "N/A"}
                  </td>
                  <td
                      onClick={() => onDeleteGame(game)}
                    >
                      <p>Delete</p>
                    </td>
                    <td>
                    <button
                    className="mt-6 rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
                    onClick={() => onAddReview(game)}
                    >
                    <span
            className="text-black font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300"
          >Add Review</span>
        </button>
                    </td>
                </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>You currently don't have games</td>
            </tr>
          )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default GameOverview;