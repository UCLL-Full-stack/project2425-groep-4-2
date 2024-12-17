import AddConsole from "@/components/consoles/AddConsole";
import ConsoleOverview from "@/components/consoles/ConsoleOverview";
import Header from "@/components/header";
import ConsoleService from "@/services/ConsoleService";
import { Console } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import Language from "@/components/language/Language";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Consoles: React.FC = () => {
    const [consoles, setConsoles] = useState<Array <Console>>([]) ;
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { t } = useTranslation();

    const getConsoles = async () => {
        const response = await ConsoleService.getAllConsoles();
        const json = await response.json();
        setConsoles(json);
    };

    const handleAddConsole = async () => {
        getConsoles();
        setIsFormOpen(false);
      };

    const handleDeleteConsole = async (console: Console) => {
        if (console.id) {
            await ConsoleService.deleteConsole(console.id);
            getConsoles();
        }
    }

    useEffect(() => {
        getConsoles();
    }, []);

    return (
        <>
            <Head>
                <title>{t("consoles.title")}</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>{t("consoles.title")}</h1>
                <button
                    className="mt-6 rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
                    onClick={() => setIsFormOpen(true)}
                >
                    <span
            className="text-black font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300"
          >{t("consoles.add")}</span>
        </button>
                <h2>{t("consoles.h2")}</h2>
                <section>
                    {
                    consoles && <ConsoleOverview consoles={consoles} onDeleteConsole={handleDeleteConsole} />
                    }
                </section>
                {isFormOpen && (
          <AddConsole
            toggleForm={() => setIsFormOpen(false)}
            onAddConsole={handleAddConsole}
          />
        )}
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};

export default Consoles;