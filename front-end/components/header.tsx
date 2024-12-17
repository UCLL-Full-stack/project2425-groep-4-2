import Link from 'next/link';
import Language from './language/Language';
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        {t('header.title')}
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          {t('header.nav.home')}
        </Link>
        <Link href="/users" className="nav-link px-4 fs-5 text-white">
          {t('header.nav.users')}
        </Link>
        <Link href="/consoles" className="nav-link px-4 fs-5 text-white">
          {t('header.nav.consoles')}
        </Link>
        <Link href="/games" className="nav-link px-4 fs-5 text-white">
        {t('header.nav.games')}
        </Link>
        <Link href="/reviews" className="nav-link px-4 fs-5 text-white">
        {t('header.nav.reviews')}
        </Link>
        {
          <Language/>
        }
      </nav>
    </header>
  );
};

export default Header;
