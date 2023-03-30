import { useSelector } from 'react-redux';
import { getFilteredContacts } from 'redux/Contacts/Contacts-selectors';

import ContactList from './ContactList/ContactList';
import FormAddContact from './FormAddContact/FormAddContact';
import ContactsFilter from './Filter/ContactsFilter';
import styles from './Phonebook.module.css';

const Phonebook = () => {
  const contacts = useSelector(getFilteredContacts);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contacts</h2>
      <div className={styles.contactBlock}>
        <div>
          <FormAddContact/>
        </div>
          <ContactsFilter/>
          <ContactList />
        {!contacts.length && <p>There are no contacts yet</p>}
      </div>
    </div>
  );
};

export default Phonebook;
