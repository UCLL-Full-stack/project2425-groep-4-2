import { Console, ConsoleGame } from "@/types";

const getAllConsoles = async () => {
  const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;
  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/consoles', {
    method: 'GET',
    headers:{
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
};

const addConsole = async (console: Console) => {
  const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/consoles', {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(console)
    })
}

export const addGameToConsole = async (consoleGame: ConsoleGame) => {
  const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;
  await fetch(process.env.NEXT_PUBLIC_API_URL + `/consoles/${consoleGame.consoleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(consoleGame),
  });
}

const deleteConsole = async (consoleId: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  return fetch(`${apiUrl}/consoles/${consoleId}`, {
      method: "DELETE",
      headers: {
          'Content-Type': 'application/json',
      }
  });
};

const getConsoleById = async (consoleId: string) => {
  const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/consoles/${consoleId}`, {
    method: 'GET',
    headers:{
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
};

const ConsoleService = {
  getAllConsoles,
  addConsole,
  deleteConsole,
  getConsoleById,
  addGameToConsole,
};

export default ConsoleService;
