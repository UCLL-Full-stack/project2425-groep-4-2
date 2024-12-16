import Link from 'next/link';
import Language from './language/Language';

const Header: React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        The GameLib
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>
        <Link href="/users" className="nav-link px-4 fs-5 text-white">
          Users
        </Link>
        <Link href="/consoles" className="nav-link px-4 fs-5 text-white">
          Consoles
        </Link>
        <Link href="/games" className="nav-link px-4 fs-5 text-white">
          Games
        </Link>
        <Link href="/reviews" className="nav-link px-4 fs-5 text-white">
          Reviews
        </Link>
        {
          <Language/>
        }
      </nav>
    </header>
  );
};

export default Header;
