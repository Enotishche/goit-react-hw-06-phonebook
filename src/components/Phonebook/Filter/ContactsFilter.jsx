import styles from './Filter.module.css';

const ContactsFilter = ({ filter, onChange }) => {
  return (
    <div>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        name="filter"
        onChange={onChange}
        value={filter}
        className={styles.filter}
        placeholder="Filter"
      />
      {/* {console.log(filter)} */}
    </div>
  );
};

export default ContactsFilter;
