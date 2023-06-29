// import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import userSlice from './featchers.js/userSlice'
// import { categoriesSlice } from './featchers.js/categoriesSlice'
// import playerReducer from '../Player'

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'




// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// }

// const rootReducer = combineReducers({
//   user: userSlice,
//   category: categoriesSlice,
//   player:playerReducer,
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)


// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// })

// export const persistor = persistStore(store)


import { configureStore } from '@reduxjs/toolkit'
import userSlice from './featchers.js/userSlice'
import { categoriesSlice } from './featchers.js/categoriesSlice'
 import playerReducer from '../Player'

 export const store = configureStore({
    reducer: {
      user: userSlice,
        category: categoriesSlice,
        player:playerReducer,
    },
})
