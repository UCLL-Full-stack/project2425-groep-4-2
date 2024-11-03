import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/home.module.css';
import Header from '@/components/header';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>The GameLib</title>
        <meta name="description" content="Users app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <h1>Welcome!</h1>
        </span>

        <div className={styles.description}>
          <p>
            A library to keep track of the consoles and games that you own.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
