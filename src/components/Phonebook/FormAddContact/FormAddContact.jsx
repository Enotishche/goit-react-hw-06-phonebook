import { useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './FormAddContact.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContacts } from 'redux/Contacts/Contacts-slice';

const FormAddContact = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const nameId = nanoid();
  const numberId = nanoid();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (
      contacts.find(
        contact => contact.name === name || contact.number === number
      )
    ) {
      return alert(`${name} and ${number} is already in contacts list.`);
    } else {
      dispatch(addContact({ id: nanoid(), name, number }));
    }
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor={nameId}>Name: </label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={nameId}
          value={name}
          onChange={handleChange}
          className="field"
          placeholder="Name"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor={numberId}>Number: </label>
        <input
          id={numberId}
          name="number"
          value={number}
          onChange={handleChange}
          className="field"
          placeholder="Number"
          type="tel"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button className={styles.btn}>Add contact</button>
    </form>
  );
};

export default FormAddContact;
