import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/home.module.css';
import Header from '@/components/header';
import Language from "@/components/language/Language";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content="Users app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <h1>{t("app.welcome")}</h1>
        </span>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Password</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
              <td>admin</td>
              <td>admin123</td>
              <td>admin</td>
          </tbody>
          <tbody>
              <td>Kevin</td>
              <td>kevin123</td>
              <td>Reviewer</td>
          </tbody>
          <tbody>
              <td>Harry</td>
              <td>harry123</td>
              <td>Normal</td>
          </tbody>
          <tbody>
              <td>reviewer</td>
              <td>reviewer123</td>
              <td>Reviewer</td>
          </tbody>
          <tbody>
              <td>normal</td>
              <td>normal123</td>
              <td>Normal</td>
          </tbody>
        </table>

        <div className={styles.description}>
          <p>
          {t("app.text")}
          </p>
        </div>
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


export default Home;
