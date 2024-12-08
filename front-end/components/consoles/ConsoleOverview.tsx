import { Console } from '@/types';
import React from 'react';
import AddConsole from './AddConsole';
import ConsoleService from '@/services/ConsoleService';

type Props = {
  consoles: Array<Console>;
  onDeleteConsole: (console: Console) => void;
};

const ConsoleOverview: React.FC<Props> = ({ consoles, onDeleteConsole }: Props) => {
  return (
    <>
      {consoles && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Price</th>
              <th scope="col">Name</th>
              <th scope="col">Version</th>
              <th scope="col">Brand</th>
              <th scope="col">Release date</th>
            </tr>
          </thead>
          <tbody>
            {consoles.length > 0 ? (
              consoles.map((console, index) => (
                <tr key={index}>
                  <td>{console.id}</td>
                  <td>{console.price}</td>
                  <td>{console.name}</td>
                  <td>{console.version}</td>
                  <td>{console.brand}</td>
                  <td>
                    {console.releaseDate.substring(8, 10)}
                    {console.releaseDate.substring(4, 8)}
                    {console.releaseDate.substring(0, 4)}
                  
                  </td>
                  <td
                      onClick={() => onDeleteConsole(console)}
                    >
                      <p>Delete</p>
                    </td>
                </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>You currently don't have consoles</td>
            </tr>
          )}
          </tbody>
        </table>
      )}
        {(
          <AddConsole
          />
        )}
    </>
  );
};

export default ConsoleOverview;
