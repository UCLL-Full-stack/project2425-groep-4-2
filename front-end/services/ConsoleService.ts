import { Console } from "@/types";

const getAllConsoles = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/consoles', {
    method: 'GET',
    headers:{
      'Content-Type' : 'application/json'
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

const ConsoleService = {
  getAllConsoles,
  addConsole,
};

export default ConsoleService;
