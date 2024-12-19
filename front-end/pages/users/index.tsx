import Header from "@/components/header";
import UserOverview from "@/components/users/UserOverview";
import UserService from "@/services/UserService";
import { User } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Users: React.FC = () => {
    const [users, setUsers] = useState<Array <User>>([]) ;
    const [statusError, setStatusError] = useState<string>();
    const [roleError, setRoleError] = useState<string>("You don't have the privileges to acces this page.");

    const [loggedInUserRole, setLoggedInUserRole] = useState<String | null>(null);
    const [loggedInUserBlacklisted, setLoggedInUserBlacklisted] = useState<boolean>(false);

    const { t } = useTranslation();
  
    useEffect(() => {
      const userString = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      if(userString){
        setLoggedInUserRole(userString.role);
        setLoggedInUserBlacklisted(userString.blacklisted)
      }
    }, []);

    const getUsers = async () => {
        const response = await UserService.getAllUsers();
        if(!response.ok){
            if(response.status === 401){
                setStatusError("You are not authorized for this page. Please login first.");
            }
            else{
                setStatusError(response.statusText);
            }
        }
        const json = await response.json();
        setUsers(json);
    };

    const handleBlacklist = async (user: User) => {
        const toUpdateUser = user;
        toUpdateUser.blacklisted = !toUpdateUser.blacklisted;
        await UserService.updateBlacklistStatus(toUpdateUser); 
        getUsers();
    };

    const { data, isLoading, error } = useSWR(
        "users",
        getUsers,
    );

    useInterval(() => {
        mutate("users", getUsers());
    }, 1000);

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Users</h1>
                <h2>Users overview</h2>
                <section>
                {error && <div className="text-red-800">{error}</div>}
                    {statusError && <div className="text-red-800">{statusError}</div>}
                    {
                    loggedInUserRole === 'admin' && !statusError && users && <UserOverview users={users} onBlacklistUser={handleBlacklist} />
                    }
                    {loggedInUserRole !== 'admin' && <div className="text-red-800">{roleError}</div>}
                    {loggedInUserBlacklisted && <div className="text-red-800">{t("app.blacklisted")}</div>}
                </section>
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
export default Users;