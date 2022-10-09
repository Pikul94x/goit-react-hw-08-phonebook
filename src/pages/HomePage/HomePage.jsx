import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

import styles from './HomePage.module.css';

export default function HomePage() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/contacts" />
      ) : (
        <div className={styles.section}>
          <h1 className={styles.title}>PhoneBook</h1>
          <p className={styles.text}>
            Please register or log in to start to work with the app.
          </p>
        </div>
      )}
    </>
  );
}
