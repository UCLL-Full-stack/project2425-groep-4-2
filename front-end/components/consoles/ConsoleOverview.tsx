import { Console } from '@/types';
import React from 'react';
import AddConsole from './AddConsole';
import ConsoleService from '@/services/ConsoleService';
import Language from "@/components/language/Language";
import { useTranslation } from "next-i18next";

type Props = {
  consoles: Array<Console>;
  onDeleteConsole: (console: Console) => void;
};

const ConsoleOverview: React.FC<Props> = ({ consoles, onDeleteConsole }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      {consoles && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">{t("consoles.table.price")}</th>
              <th scope="col">{t("consoles.table.name")}</th>
              <th scope="col">{t("consoles.table.version")}</th>
              <th scope="col">{t("consoles.table.brand")}</th>
              <th scope="col">{t("consoles.table.date")}</th>
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
                    {console.releaseDate
                    ? new Date(console.releaseDate).toLocaleDateString('en-GB') 
                    : "N/A"}
                  </td>
                  <td
                      onClick={() => onDeleteConsole(console)}
                    >
                      <p>{t("consoles.table.delete")}</p>
                    </td>
                    <td className='text-black font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300'>
                    <a href={`/consoles/${console.id}`} >View games for console</a>
                      
                    </td>
                </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>{t("consoles.table.text")}</td>
            </tr>
          )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ConsoleOverview;
