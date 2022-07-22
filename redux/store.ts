import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

enum AppTheme {
    light,
    dark
}

/// Recupero el usuario del LocalStorage si existe
const initialUser = null

const initialState: AppState = {
    user: initialUser,
    theme: AppTheme.light,
}

interface User {
    _id: string
    name: string,
    lastName: string,
    email: string
}

export interface AppState{
    user?: User,
    theme: AppTheme
}
export const appSlice = createSlice({
    name: "AppState",
    initialState,
    reducers: {
        userChanged: (state, action) => {
            const user = action.payload
            return {...state, user: user}
        },
        appThemeChanged: (state) => {
            return {...state, theme: state.theme === AppTheme.light ? AppTheme.dark : AppTheme.light}
        }
    }
})
const persistedReducer = persistReducer(persistConfig, appSlice.reducer)

export let appStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false,
    })
})
export let persistor = persistStore(appStore)
