import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../redux/LoginRegister/authSlice';
import teacherReducer from './Teachers/teacherSlice';
import homeWorkReducer from './HomeWork/HwSlice';
import coursReducer from './cours/coursSlice';
import conclusionReducer from './Conclu/concluSlice';
import eventsReducer from './Events/eventsSlice';
import cultureReducer from './cultureSlice/cultureSlice';
import notificationReducer from './Notification/notificationSlice';
import examReducer from './Exam/examSlice';

// Persist config - only persist auth to avoid unnecessary storage
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isLoggedIn']
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    teacher: teacherReducer,
    homeWork: homeWorkReducer,
    courses: coursReducer,
    conclusion: conclusionReducer,
    events: eventsReducer,
    culture: cultureReducer,
    notifications: notificationReducer,
    Exams: examReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;