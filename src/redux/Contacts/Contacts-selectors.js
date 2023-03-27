export const getContacts = store => store.contacts;
export const getFilteredContacts = (store) => {  
    
    const { contacts, filter } = store.contacts;
    
    
    if (!filter) {
        return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({name, number}) => {
        const normalizedName = name.toLocaleLowerCase();
        const normalizedNumber = number.toLocaleLowerCase();
        const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
        return result;
    })
    
    return filteredContacts;
}