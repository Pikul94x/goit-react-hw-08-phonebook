import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import Navigation from 'components/Navigation/Navigation';
import UserMenu from 'components/UserMenu/UserMenu';
import AuthForm from 'components/AuthForm/AuthForm';
import styles from './Header.module.css';

export default function Header() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthForm />}
      </div>
    </header>
  );
}
