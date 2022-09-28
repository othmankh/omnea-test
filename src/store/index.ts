import { combineReducers, configureStore } from '@reduxjs/toolkit';
import noteReducer from "./note";

const rootReducer = (state: any, action: any) => {
    return combinedReducer(state, action);
};

const combinedReducer = combineReducers({
    note: noteReducer,
});

export const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;