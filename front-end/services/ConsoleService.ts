import { Console } from "@/types";

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
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/consoles', {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(console)
    })
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

const ConsoleService = {
  getAllConsoles,
  addConsole,
  deleteConsole,
};

export default ConsoleService;
