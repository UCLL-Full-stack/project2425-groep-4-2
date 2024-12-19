//import AddGame from "@/components/games/AddGame";
import AddGame from "@/components/games/AddGame";
import GameOverview from "@/components/games/GameOverview";
import Header from "@/components/header";
import AddReview from "@/components/reviews/AddReview";
import GameService from "@/services/GameService";
import { Game } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";

const Games: React.FC = () => {
    const [games, setGames] = useState<Array <Game>>([]) ;
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [error, setError] = useState<string>();
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<Game>();

    const getGames = async () => {
        const response = await GameService.getAllGames();
        if(!response.ok){
            if(response.status === 401){
                setError("You are not authorized for this page. Please login first.");
            }
            else{
                setError(response.statusText);
            }
        }
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

    const handleReviewForm = async (game: Game) => {
        setIsReviewFormOpen(true)
        setSelectedGame(game);
    }

    const handleAddReview = async () => {
        
    }

    useEffect(() => {
        getGames();
    }, []);

    const [loggedInUserBlacklisted, setLoggedInUserBlacklisted] = useState<boolean>(false);
  
    useEffect(() => {
      const userString = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      if(userString){
        setLoggedInUserBlacklisted(userString.blacklisted)
      }
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
                {error && <div className="text-red-800">{error}</div>}
                    {
                    !loggedInUserBlacklisted && !error && games && <GameOverview games={games} onDeleteGame={handleDeleteGame} onAddReview={handleReviewForm} />
                    }
                    {loggedInUserBlacklisted && <div className="text-red-800">You have been blacklisted. Please contact the admin.</div>}
                </section>
                {isFormOpen && (
          <AddGame
            toggleForm={() => setIsFormOpen(false)}
            onAddGame={handleAddGame}
          />
        )} 

        {isReviewFormOpen && (
          <AddReview
            toggleForm={() => setIsReviewFormOpen(false)}
            onAddReview={handleAddReview}
            game={selectedGame}
          />
        )} 
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};

export default Games;