import ConsoleService from '@/services/ConsoleService';
import { Console } from '@/types';
import React, { useState } from 'react';

const AddConsole: React.FC = () => {
  const [id, setId] = useState<number | undefined>()
  const [name, setName] = useState('')
  const [version, setVersion] = useState('')
  const [brand, setBrand] = useState('')

  const handleAddConsole = async () => {
    const newConsole: Console = {
      id,
      name,
      version,
      brand,
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
