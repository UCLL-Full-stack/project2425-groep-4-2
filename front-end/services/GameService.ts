import { Game } from "@/types";

const getAllGames = async () => {
  const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;
  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/games', {
    method: 'GET',
    headers:{
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
};

const addGame = async (game: Game) => {
  const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/games', {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(game)
    })
}

const deleteGame = async (gameId: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  return fetch(`${apiUrl}/games/${gameId}`, {
      method: "DELETE",
      headers: {
          'Content-Type': 'application/json',
      }
  });
};

const getGameById = async (gameId: number) => {
  const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/games/${gameId}`, {
    method: 'GET',
    headers:{
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
};

const GameService = {
  getAllGames,
  addGame,
  deleteGame,
  getGameById,
};

export default GameService;