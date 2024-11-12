import ConsoleOverview from "@/components/consoles/ConsoleOverview";
import Header from "@/components/header";
import ConsoleService from "@/services/ConsoleService";
import { Console } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Consoles: React.FC = () => {
    const [consoles, setConsoles] = useState<Array <Console>>([]) ;

    const getConsoles = async () => {
        const response = await ConsoleService.getAllConsoles();
        const json = await response.json();
        setConsoles(json);
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
                <title>Consoles</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Consoles</h1>
                <h2>Consoles overview</h2>
                <section>
                    {
                    consoles && <ConsoleOverview consoles={consoles} onDeleteConsole={handleDeleteConsole} />
                    }
                </section>
                
            </main>
        </>
    );
};

export default Consoles;