import Header from "@/components/header";
import UserOverview from "@/components/users/UserOverview";
import UserService from "@/services/UserService";
import { User } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Users: React.FC = () => {
    const [users, setUsers] = useState<Array <User>>([]) ;

    const getUsers = async () => {
        const response = await UserService.getAllUsers();
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
                    {
                    users && <UserOverview users={users} onBlacklistUser={handleBlacklist} />
                    }
                </section>
            </main>
        </>
    );
};
export default Users;