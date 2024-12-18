import { headers } from "next/headers";
import { User } from "@/types"

const getAllUsers = async () => {
  const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;
  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
    method: 'GET',
    headers:{
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${token}`,
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
  const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  return await response.json();
}

const loginUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
  });
};


const UserService = {
  getAllUsers,
  getUserById,
  updateBlacklistStatus,
  loginUser,
};

export default UserService;
