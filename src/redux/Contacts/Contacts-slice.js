import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

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

export const { addContact, removeContact } = contactsSlice.actions;
export const getContacts = state => state.contacts.contacts;