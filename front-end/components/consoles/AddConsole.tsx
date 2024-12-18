import ConsoleService from '@/services/ConsoleService';
import { Console } from '@/types';
import React, { useState } from 'react';
import Language from "@/components/language/Language";
import { useTranslation } from "next-i18next";

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
  const { t } = useTranslation();

  const handleAddConsole = async () => {
    if (!price) {
      alert(t("consoles.form.error.price"))
    }
    if (!name) {
      alert(t("consoles.form.error.name"))
    }
    if (!version) {
      alert(t("consoles.form.error.version"))
    }
    if (!brand) {
      alert(t("consoles.form.error.brand"))
    }
    if (!releaseDate) {
      alert(t("consoles.form.error.date"))
    }

    
    const userString = localStorage.getItem('loggedInUser');

    let loggedInUserId: number;

    if (userString) {
      const userObject = JSON.parse(userString);
      loggedInUserId = userObject.id;
    
      const newConsole: Console = {
        userId: loggedInUserId,
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
    } else {
      console.log('No logged in user');
    }
  }
  
  return (
    <>
    <form style={{display: 'grid'}}>
        <label>{t("consoles.form.price")}</label>
        <input
          type='number'
          className="border p-2 mb-4 w-full"
          value={price}
          onChange={(value) => setPrice(value.target.valueAsNumber)}
        />
      <label>{t("consoles.form.name")}</label>
        <input
          className="border p-2 mb-4 w-full"
          value={name}
          onChange={(value) => setName(value.target.value)}
        />
      <label>{t("consoles.form.version")}</label>
        <input
          className="border p-2 mb-4 w-full"
          value={version}
          onChange={(value) => setVersion(value.target.value)}
        />
      <label>{t("consoles.form.brand")}</label>
        <input
          className="border p-2 mb-4 w-full"
          value={brand}
          onChange={(value) => setBrand(value.target.value)}
        />
      <label>{t("consoles.form.date")}</label>
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
        {t("consoles.form.cancel")}
      </button>
      <button
        className="bg-blue-500 text-black p-2 rounded-lg"
        onClick={handleAddConsole}
      >
        {t("consoles.form.add")}
      </button>
      </div>
        </form>
    </>
  );
};

export default AddConsole;
