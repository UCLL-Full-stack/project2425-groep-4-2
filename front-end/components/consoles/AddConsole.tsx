import ConsoleService from '@/services/ConsoleService';
import { Console } from '@/types';
import React, { useState } from 'react';

type Props = {
  toggleForm: () => void;
  onAddConsole: (console: Console) => void;
};

const AddConsole: React.FC<Props> = ({toggleForm, onAddConsole}) => {
  const [price, setPrice] = useState<number | undefined>()
  const [name, setName] = useState('')
  const [version, setVersion] = useState('')
  const [brand, setBrand] = useState('')
  const [releaseDate, setDate] = useState('')

  const handleAddConsole = async () => {
    if (!price) {
      alert("price is required")
    }
    if (!name) {
      alert("name is required")
    }
    if (!version) {
      alert("version is required")
    }
    if (!brand) {
      alert("brand is required")
    }
    if (!releaseDate) {
      alert("release date is required")
    }

    const newConsole: Console = {
      userId: 19,
      price,
      name,
      version,
      brand,
      releaseDate,
      games: [],
    }
    await ConsoleService.addConsole(newConsole);
    onAddConsole(newConsole);
    toggleForm();
  }
  
  return (
    <>
    <form style={{display: 'grid'}}>
        <label>Price</label>
        <input
          type='number'
          className="border p-2 mb-4 w-full"
          value={price}
          onChange={(value) => setPrice(value.target.valueAsNumber)}
        />
      <label>Name</label>
        <input
          className="border p-2 mb-4 w-full"
          value={name}
          onChange={(value) => setName(value.target.value)}
        />
      <label>Version</label>
        <input
          className="border p-2 mb-4 w-full"
          value={version}
          onChange={(value) => setVersion(value.target.value)}
        />
      <label>Brand</label>
        <input
          className="border p-2 mb-4 w-full"
          value={brand}
          onChange={(value) => setBrand(value.target.value)}
        />
      <label>Date</label>
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
        onClick={handleAddConsole}
      >
        Add Console
      </button>
      </div>
        </form>
    </>
  );
};

export default AddConsole;
