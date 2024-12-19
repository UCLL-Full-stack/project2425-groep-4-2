import Header from "@/components/header";
import UserOverview from "@/components/users/UserOverview";
import UserService from "@/services/UserService";
import { User } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Users: React.FC = () => {
    const [users, setUsers] = useState<Array <User>>([]) ;
    const [error, setError] = useState<string>();
    const [roleError, setRoleError] = useState<string>("You don't have the privileges to acces this page.");

    const [loggedInUserRole, setLoggedInUserRole] = useState<String | null>(null);
    const [loggedInUserBlacklisted, setLoggedInUserBlacklisted] = useState<boolean>(false);
  
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
                setError("You are not authorized for this page. Please login first.");
            }
            else{
                setError(response.statusText);
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

    useEffect(() => {
        getUsers();
    }, []);

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
                    {
                    loggedInUserRole === 'admin' && !error && users && <UserOverview users={users} onBlacklistUser={handleBlacklist} />
                    }
                    {loggedInUserRole !== 'admin' && <div className="text-red-800">{roleError}</div>}
                    {loggedInUserBlacklisted && <div className="text-red-800">You have been blacklisted. Please contact the admin.</div>}
                </section>
            </main>
        </>
    );
};
export default Users;