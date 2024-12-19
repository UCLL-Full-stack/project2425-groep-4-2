import { Console, ConsoleGame, Game } from '@/types';
import React, { useEffect, useState } from 'react';
import AddConsole from './AddConsole';
import ConsoleService from '@/services/ConsoleService';
import Language from "@/components/language/Language";
import { useTranslation } from "next-i18next";
import GameService from '@/services/GameService';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

type Props = {
  consoles: Array<Console>;
  onDeleteConsole: (console: Console) => void;
};

const ConsoleOverview: React.FC<Props> = ({ consoles, onDeleteConsole }: Props) => {
  const [selectedConsole, setSelectedConsole] = useState<Console>();
  const [showGames, setShowGames] = useState(false);
  const [statusError, setStatusError] = useState<string>();
  const [games, setGames] = useState<Array <Game>>([]) ;

  const getGames = async () => {
    const response = await GameService.getAllGames();
    if(!response.ok){
        if(response.status === 401){
          setStatusError("You are not authorized for this page. Please login first.");
        }
        else{
          setStatusError(response.statusText);
        }
    }
    const json = await response.json();
    setGames(json);
    return json;
};

  const handleAddGame = async (gameId?: number) =>{
    setShowGames(false);
    const newConsoleGame: ConsoleGame = {
      consoleId: selectedConsole?.id,
      gameId,
    }
    await ConsoleService.addGameToConsole(newConsoleGame);
  }

  const handleShowGames = async (console: Console) =>{
    setSelectedConsole(console);
    setShowGames(true);
  }

  const { data, isLoading, error } = useSWR(
    "games",
    getGames
);

  useInterval(() => {
      mutate("games", getGames());
  }, 1000);
  

  const { t } = useTranslation();
  return (
    <>
      {consoles && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">{t("consoles.table.price")}</th>
              <th scope="col">{t("consoles.table.name")}</th>
              <th scope="col">{t("consoles.table.version")}</th>
              <th scope="col">{t("consoles.table.brand")}</th>
              <th scope="col">{t("consoles.table.date")}</th>
            </tr>
          </thead>
          <tbody>
            {consoles.length > 0 ? (
              consoles.map((console, index) => (
                <tr key={index} onClick={() => handleShowGames(console)}>
                  <td>{console.id}</td>
                  <td>{console.price}</td>
                  <td>{console.name}</td>
                  <td>{console.version}</td>
                  <td>{console.brand}</td>
                  <td>
                    {console.releaseDate
                    ? new Date(console.releaseDate).toLocaleDateString('en-GB') 
                    : "N/A"}
                  </td>
                    <td className='text-black font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300'>
                    <a href={`/consoles/${console.id}`} >View games for console</a>
                    </td>
                </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>{t("consoles.table.text")}</td>
            </tr>
          )}
          
          {
            showGames && (
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
                        <td>
                    <button
                    className="mt-6 rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
                    onClick={() => handleAddGame(game.id)}
                    >
                    <span
            className="text-black font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300"
          >Add game to console</span>
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
            )
          }
          </tbody>
        </table>
      )}
      {statusError}
      {error && <div className="text-red-800">{error}</div>}
    </>
  );
};

export default ConsoleOverview;
