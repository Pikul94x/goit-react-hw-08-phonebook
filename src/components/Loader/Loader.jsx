import { HollowDotsSpinner } from 'react-epic-spinners';
import styles from './Loader.module.css';
import PropTypes from 'prop-types';

const Loader = ({ color, size }) => {
  return (
    <div className={styles.background}>
      <div className={styles.loader}>
        <HollowDotsSpinner color={color} size={size} />
      </div>
    </div>
  );
};

export default Loader;

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};
