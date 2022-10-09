import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import { authOperations } from 'redux/auth';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);
  const email = useSelector(authSelectors.getUserEmail);

  return (
    <div className={styles.nav}>
      <div className={styles.menu}>
        <p className={styles.text}>Current user: {name}</p>
        <p className={styles.text}>{email}</p>
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={() => dispatch(authOperations.logOut())}
      >
        Log Out
      </button>
    </div>
  );
}
