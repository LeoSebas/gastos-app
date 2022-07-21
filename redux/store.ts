import {configureStore, createSlice} from "@reduxjs/toolkit";
enum AppTheme {
    light,
    dark
}
const initialState: AppState = {
    user: null,
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
            return {...state, user: action.payload}
        },
        appThemeChanged: (state) => {
            return {...state, theme: state.theme === AppTheme.light ? AppTheme.dark : AppTheme.light}
        }
    }
})

export const appStore = configureStore({reducer: appSlice.reducer})
export {}