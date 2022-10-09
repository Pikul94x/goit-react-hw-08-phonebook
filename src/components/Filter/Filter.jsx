import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterContact } from '../../redux/contacts/contactsActions';
import styles from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contactsReducer.filter);
  const onChange = e => dispatch(filterContact(e));

  return (
    <div className={styles.section}>
      <label htmlFor="filter">
        <h2 className={styles.title}>Find contact by name:</h2>
        <input
          type="text"
          name="filter"
          id="filter"
          value={filter}
          onChange={onChange}
          className={styles.input}
          placeholder="Find name"
        />
      </label>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string,
};
