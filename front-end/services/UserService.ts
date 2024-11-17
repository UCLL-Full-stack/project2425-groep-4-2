import { headers } from "next/headers";
import { User } from "@/types"

const getAllUsers = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
    method: 'GET',
    headers:{
      'Content-Type' : 'application/json'
    },
  })
};


const getUserById = (userId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  }
}

export const updateBlacklistStatus = async (user: User) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    user
    }),
  });

  return await response.json();
}


const UserService = {
  getAllUsers,
  getUserById,
  updateBlacklistStatus,
};

export default UserService;
