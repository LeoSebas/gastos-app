import {configureStore, createSlice} from "@reduxjs/toolkit";
enum AppTheme {
    light,
    dark
}
const initialState = {
    user: null,
    theme: AppTheme.light,
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