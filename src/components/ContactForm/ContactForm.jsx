import { useState } from 'react';
import { useGetContactsQuery, useAddContactMutation } from 'api/contactsAPI';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { data: contacts } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  const handleSubmit = e => {
    e.preventDefault();
    if (contacts.find(cont => cont.name.toLowerCase() === name.toLowerCase())) {
      return Notify.failure(`${name} is already in contacts`);
    }
    const id = nanoid();
    addContact({ id, name, number });
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="nameInputId">
        Name
      </label>
      <input
        value={name}
        type="text"
        name="name"
        id="nameInputId"
        placeholder="Enter Name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={e => setName(e.currentTarget.value)}
        className={styles.input}
      />
      <br />
      <label className={styles.label} htmlFor="numberInputId">
        Number
      </label>
      <input
        value={number}
        type="tel"
        name="number"
        id="numberInputId"
        placeholder="Enter Number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={e => setNumber(e.currentTarget.value)}
        className={styles.input}
      />
      <br />
      <button className={styles.button} type="submit">
        Add Contact
      </button>
    </form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
