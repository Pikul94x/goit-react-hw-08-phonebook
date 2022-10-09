import React from 'react';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'api/contactsAPI';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';
import ContactListElement from './ContactListElement/ContactListElement';

const ContactList = () => {
  const filter = useSelector(state => state.contactsReducer.filter);
  const { data: contacts, isFetching, isError } = useGetContactsQuery();
  const filteredContacts =
    contacts &&
    contacts.filter(contact => contact.name.toLowerCase().includes(filter));
  const isContactsEmpty = filteredContacts && filteredContacts.length > 0;

  return (
    <>
      {isFetching && <Loader color={'#3f51b5'} size={32} />}
      {isError && console.log(isError)}
      {isContactsEmpty ? (
        <ul>
          {filteredContacts.map(({ id, name, number }) => (
            <ContactListElement key={id} id={id} name={name} number={number} />
          ))}
        </ul>
      ) : (
        <ul>
          <p>The phonebook is empty...</p>
        </ul>
      )}
    </>
  );
};

export default ContactList;

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
