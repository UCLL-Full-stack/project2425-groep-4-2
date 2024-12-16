//import AddGame from "@/components/games/AddGame";
import AddGame from "@/components/games/AddGame";
import GameOverview from "@/components/games/GameOverview";
import Header from "@/components/header";
import GameService from "@/services/GameService";
import { Game } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Games: React.FC = () => {
    const [games, setGames] = useState<Array <Game>>([]) ;
    const [isFormOpen, setIsFormOpen] = useState(false);

    const getGames = async () => {
        const response = await GameService.getAllGames();
        const json = await response.json();
        setGames(json);
    };

    const handleAddGame = async () => {
        getGames();
        setIsFormOpen(false);
      };

    const handleDeleteGame = async (game: Game) => {
        if (game.id) {
            await GameService.deleteGame(game.id);
            getGames();
        }
    }

    useEffect(() => {
        getGames();
    }, []);

    return (
        <>
            <Head>
                <title>Games</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Games</h1>
                <button
                    className="mt-6 rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
                    onClick={() => setIsFormOpen(true)}
                >
                    <span
            className="text-black font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300"
          >Add Game</span>
        </button>
                <h2>Games overview</h2>
                <section>
                    {
                    games && <GameOverview games={games} onDeleteGame={handleDeleteGame} />
                    }
                </section>
                {isFormOpen && (
          <AddGame
            toggleForm={() => setIsFormOpen(false)}
            onAddGame={handleAddGame}
          />
        )} 
            </main>
        </>
    );
};

export default Games;