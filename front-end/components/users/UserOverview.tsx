import UserService from '@/services/UserService';
import { User } from '@/types';
import React from 'react';

type Props = {
  users: Array<User>;
  onBlacklistUser: (user: User) => void;
};


const UserOverview: React.FC<Props> = ({ users, onBlacklistUser }: Props) => {
  return (
    <>
      {users && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Blacklist</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                        className="hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={() => onBlacklistUser(user)}
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
