import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ConfigSlice from "./Slicers/config";
import FeedFilterSlice from "./Slicers/feedFilters";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  config: ConfigSlice,
  feedFilters: FeedFilterSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch