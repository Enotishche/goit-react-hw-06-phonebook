import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export const contactsSlice = createSlice({
    name: "contacts",
    initialState: [],
    reducers: {
        addContact: {
            reducer: (store, {payload}) => {
                store.push(payload);
            },
            prepare: (data) => {
                return {
                    payload: {
                        ...data,
                        id: nanoid()
                    }
                }
            }
        },
        removeContact: (store, {payload}) => store.filter(({id}) => id !== payload)
    }
})


const persistConfig = {
    key: 'contacts',
    storage,
  };
  
  export const contactsReducer = persistReducer(
    persistConfig,
    contactsSlice.reducer
  );


export const { addContact, removeContact } = contactsSlice.actions;
export const getContacts = state => state.contacts.contacts;