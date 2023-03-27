import { configureStore } from '@reduxjs/toolkit';
import {filterSlice}  from './Filter/Filter-slice';
import {contactsSlice} from './Contacts/Contacts-slice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "@reduxjs/toolkit";



const contactReducer = combineReducers({
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
 })
const contactPersistConfig = {
        key: 'root',
        storage,
}


const persistedContactsReducer = persistReducer(contactPersistConfig, contactReducer);


export const store = configureStore({
    reducer: {
        contacts: persistedContactsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);