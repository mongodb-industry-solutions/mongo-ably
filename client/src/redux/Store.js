import { configureStore } from "@reduxjs/toolkit";

import MessageReducer from './slices/MessageSlice'

export const Store = configureStore({
    reducer: {
        "Message": MessageReducer
    }
})
