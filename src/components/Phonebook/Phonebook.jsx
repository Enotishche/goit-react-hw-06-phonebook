import { useState, useEffect } from 'react';
import FormAddContact from './FormAddContact/FormAddContact';
import ContactList from './ContactList/ContactList';
import ContactsFilter from './Filter/ContactsFilter';
import { nanoid } from 'nanoid';
import styles from './Phonebook.module.css';

const Phonebook = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    if (isDuplicate(contact)) {
      return alert(
        `${contact.name} - ${contact.number} is already in contacts`
      );
    }

    setContacts(prev => {
      const newContact = {
        id: nanoid(),
        ...contact,
      };
      return [...prev, newContact];
    });
  };

  const removeContact = id => {
    setContacts(prev => {
      const newContacts = prev.filter(item => item.id !== id);
      return newContacts;
    });
  };

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const isDuplicate = ({ name, number }) => {
    const result = contacts.find(
      item => item.name === name || item.number === number
    );
    return result;
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const normalizedNumber = number.toLocaleLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) ||
        normalizedNumber.includes(normalizedFilter);
      return result;
    });

    return filteredContacts;
  };

  const contactsFilter = getFilteredContacts();
  const isContacts = contacts.length !== 0;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contacts</h2>

      <div className={styles.contactBlock}>
        <div>
          <FormAddContact onSubmit={addContact} />
        </div>
        <div>
          <ContactsFilter onChange={handleChange} filter={filter} />
          <ContactList items={contactsFilter} removeContact={removeContact} />
        </div>
        {!isContacts && <p>There are no contacts yet</p>}
      </div>
    </div>
  );
};

export default Phonebook;
