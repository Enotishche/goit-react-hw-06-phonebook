import { useSelector, useDispatch } from 'react-redux';
import { addContact, removeContact } from 'redux/Contacts/Contacts-slice';
import { getFilteredContacts } from 'redux/Contacts/Contacts-selectors';
import { setFilter } from 'redux/Filter/Filter-slice';
import { getFilter } from 'redux/Filter/Filter-selectors';
import ContactList from './ContactList/ContactList';
import FormAddContact from './FormAddContact/FormAddContact';
import ContactsFilter from './Filter/ContactsFilter';
import styles from './Phonebook.module.css';

const Phonebook = () => {
  const contacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleAddContact = contact => {
    if (isDuplicate(contact)) {
      return alert(
        `${contact.name} - ${contact.number} is already in contacts`
      );
    }

    const action = addContact(contact);
    dispatch(action);
  };

  const handleRemoveContact = id => {
    const action = removeContact(id);
    dispatch(action);
  };

  const handleChange = e => {
    const { value } = e.target;
    dispatch(setFilter(value));
  };

  const isDuplicate = ({ name, number }) => {
    const result = contacts.find(
      item => item.name === name || item.number === number
    );
    return result;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contacts</h2>
      <div className={styles.contactBlock}>
        <div>
          <FormAddContact onSubmit={handleAddContact} />
        </div>
        <ContactsFilter onChange={handleChange} filter={filter} />
        <ContactList items={contacts} removeContact={handleRemoveContact} />
        {!contacts.length && <p>There are no contacts yet</p>}
      </div>
    </div>
  );
};

export default Phonebook;
