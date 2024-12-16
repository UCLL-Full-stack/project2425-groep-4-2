import GameService from '@/services/GameService';
import { Game } from '@/types';
import React, { useState } from 'react';

type Props = {
  toggleForm: () => void;
  onAddGame: (game: Game) => void;
};

const AddGame: React.FC<Props> = ({toggleForm, onAddGame}) => {
  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [developer, setDevelopter] = useState('')
  const [releaseDate, setDate] = useState('')

  const handleAddGame = async () => {
    if (!name) {
      alert("Name is required")
    }
    if (!genre) {
      alert("Genre is required")
    }
    if (!developer) {
      alert("Developer is required")
    }
    if (!releaseDate) {
      alert("Release date is required")
    }

    const newGame: Game = {
      name,
      genre,
      developer,
      releaseDate,
    }
    await GameService.addGame(newGame);
    onAddGame(newGame);
    toggleForm();
  }
  
  return (
    <>
    <form style={{display: 'grid'}}>
      <label>Name</label>
        <input
          className="border p-2 mb-4 w-full"
          value={name}
          onChange={(value) => setName(value.target.value)}
        />
      <label>Genre</label>
        <input
          className="border p-2 mb-4 w-full"
          value={genre}
          onChange={(value) => setGenre(value.target.value)}
        />
      <label>Developer</label>
        <input
          className="border p-2 mb-4 w-full"
          value={developer}
          onChange={(value) => setDevelopter(value.target.value)}
        />
      <label>Release date</label>
        <input
          className="border p-2 mb-4 w-full"
          type='date'
          value={releaseDate}
          onChange={(value) => setDate(value.target.value)}
        />
      <div>  
      <button
        className="bg-blue-500 text-black p-2 rounded-lg"
        onClick={toggleForm}
      >
        Cancel
      </button>
      <button
        className="bg-blue-500 text-black p-2 rounded-lg"
        onClick={handleAddGame}
      >
        Add Console
      </button>
      </div>
        </form>
    </>
  );
};

export default AddGame;
