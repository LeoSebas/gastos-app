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
    categories: [],
    expensesQueryParams: {}
}

export interface LibraryItem {
    _id: string,
    name: string,
    color: string,
}

export interface ExpensesQueryParams {
    search?: string,
    minValue?: string,
    maxValue?: string,
    minDate?: string,
    maxDate?: string,
    category?: string,
    sortBy?: string,
    itemsPerPage?: number,
    page?: number,
    desc?: number
}


export interface User {
    _id: string,
    name: string,
    lastName: string,
    email: string,
    token: string
}

export interface AppState{
    user?: User,
    theme: AppTheme,
    categories: Array<LibraryItem>
    expensesQueryParams: ExpensesQueryParams
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
        },
        setCategories:(state, action) => {
            const categories = action.payload
            return { ...state, categories: categories}
        },
        setQueryParams: (state, action) => {
            return {...state, expensesQueryParams: action.payload}
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
