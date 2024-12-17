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
