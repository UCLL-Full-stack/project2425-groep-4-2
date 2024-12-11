import { Game } from '@/types';
import React from 'react';
//import AddGame from './AddGame';
import GameService from '@/services/GameService';

type Props = {
  games: Array<Game>;
  onDeleteGame: (game: Game) => void;
};

const GameOverview: React.FC<Props> = ({ games, onDeleteGame }: Props) => {
  return (
    <>
      {games && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Price</th>
              <th scope="col">Name</th>
              <th scope="col">Version</th>
              <th scope="col">Brand</th>
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