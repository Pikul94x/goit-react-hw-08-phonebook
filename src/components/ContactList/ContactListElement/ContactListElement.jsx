import { useDeleteContactMutation } from '../../../api/contactsAPI';
import PropTypes from 'prop-types';
import styles from './ContactListElement.module.css';

const ContactListElement = ({ id, name, number }) => {
  const [deleteContact] = useDeleteContactMutation();
  return (
    <>
      <li key={id}>
        <span>
          {name}: {number}
        </span>
        <button className={styles.button} onClick={() => deleteContact(id)}>
          Delete
        </button>
      </li>
    </>
  );
};

export default ContactListElement;

ContactListElement.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};
