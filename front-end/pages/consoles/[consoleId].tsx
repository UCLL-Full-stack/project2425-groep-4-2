import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import Head from "next/head";
import Header from "@/components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { Console } from "@/types";
import ConsoleService from "@/services/ConsoleService";
import GameOverview from "@/components/games/GameOverview";
import useInterval from "use-interval";

const ReadConsoleById = () => {
    const [console, setConsole] = useState<Console | undefined>(undefined);

    const router = useRouter();
    const {consoleId} = router.query;

    const getConsoleById = async () => {
        const [consoleResponse] = await Promise.all([ConsoleService.getConsoleById(consoleId as string)]);
        const [console] = await Promise.all([consoleResponse.json()]);
        setConsole(console);
    }

    const { data, isLoading, error } = useSWR(
      "consoleId",
      getConsoleById,
  );
  

  useInterval(() => {
    mutate("consoleId", getConsoleById);
}, 1000);


    const [loggedInUserBlacklisted, setLoggedInUserBlacklisted] = useState<boolean>(false);
  
    useEffect(() => {
      const userString = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      if(userString){
        setLoggedInUserBlacklisted(userString.blacklisted)
      }
    }, []);

    return (
        <>
            <Head>
                <title>Console</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Games for console {console?.name + " "}{console?.version}</h1>
                <section className="w-50">
                {!loggedInUserBlacklisted && console && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Genre</th>
              <th scope="col">Developer</th>
              <th scope="col">Release date</th>
            </tr>
          </thead>
          <tbody>
            {console.games.length > 0 ? (
              console.games.map((game, index) => (
                <tr key={index}>
                  <td>{game.id}</td>
                  <td>{game.name}</td>
                  <td>{game.genre}</td>
                  <td>{game.developer}</td>
                  <td>
                    {game.releaseDate
                    ? new Date(game.releaseDate).toLocaleDateString('en-GB') 
                    : "N/A"}
                  </td>
                </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>You currently don't have games</td>
            </tr>
          )}
          </tbody>
        </table>
      )}
      {loggedInUserBlacklisted && <div className="text-red-800">You have been blacklisted. Please contact the admin.</div>}
      {error && <div className="text-red-800">{error}</div>}
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;

    return{
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
}

export default ReadConsoleById;
