import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../redux/LoginRegister/authSlice';
import teacherReducer from './Teachers/teacherSlice';
import homeWorkReducer from './HomeWork/HwSlice';
import coursReducer from './cours/coursSlice'
const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedTeacherReducer = persistReducer(persistConfig, teacherReducer);
const persistedHomeWorkReducer = persistReducer(persistConfig, homeWorkReducer);
const persistedCoursReducer = persistReducer(persistConfig, coursReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    teacher: persistedTeacherReducer, // Add the teacherReducer to the store's reducers
    homeWork : persistedHomeWorkReducer,
    courses :persistedCoursReducer 
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export default store;
