import styles from './ContactList.module.css';

const ContactList = ({ items, removeContact }) => {
  const elements = items.map(({ name, number, id }) => {
    return (
      <li key={id} className={styles.item}>
        {name}: {number}{' '}
        <span onClick={() => removeContact(id)} className={styles.remove}>
          delete
        </span>
      </li>
    );
  });

  return (
    <>
      <h4 className={styles.title}>Contacts</h4>

      <ol>{elements}</ol>
    </>
  );
};

export default ContactList;
