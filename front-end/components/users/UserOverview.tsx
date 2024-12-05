import UserService from '@/services/UserService';
import { User } from '@/types';
import React from 'react';

type Props = {
  users: Array<User>;
};


const handleBlacklist = async (user: User) => {
    const toUpdateUser = user;
    toUpdateUser.blacklisted = !toUpdateUser.blacklisted;
    await UserService.updateBlacklistStatus(toUpdateUser); 
};

const UserOverview: React.FC<Props> = ({ users }: Props) => {
  return (
    <>
      {users && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Blacklist</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                        className="hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={() => handleBlacklist(user)}
                      >
                        {user.blacklisted ? "Whitelist" : "Blacklist"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserOverview;
