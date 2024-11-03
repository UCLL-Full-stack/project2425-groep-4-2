import ConsoleService from '@/services/ConsoleService';
import { Console } from '@/types';
import React, { useState } from 'react';

const AddConsole: React.FC = () => {
  const [id, setId] = useState<number | undefined>()
  const [price, setPrice] = useState<number | undefined>()
  const [name, setName] = useState('')
  const [version, setVersion] = useState('')
  const [brand, setBrand] = useState('')
  const [releaseDate, setDate] = useState('')

  const handleAddConsole = async () => {
    const newConsole: Console = {
      id,
      price,
      name,
      version,
      brand,
      releaseDate,
    }
    await ConsoleService.addConsole(newConsole)
  }
  
  return (
    <>
    <form style={{display: 'grid'}}>
      <label>Id</label>
        <input
          type='number'
          className="border p-2 mb-4 w-full"
          value={id}
          onChange={(value) => setId(value.target.valueAsNumber)}
        />
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
      <button
        className="bg-blue-500 text-white p-2 rounded-lg"
        onClick={handleAddConsole}
      >
        Add Console
      </button>
        </form>
    </>
  );
};

export default AddConsole;
