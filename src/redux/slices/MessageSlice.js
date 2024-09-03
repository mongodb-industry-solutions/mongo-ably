import { createSlice } from "@reduxjs/toolkit";

const MessageSlice = createSlice({
    name: "Message",
    initialState: {
        filter: '',
        list: [
            // {
            //     "id": "5cf10d16-de86-4499-9fba-143078842f2c",
            //     "content": "Another message for you!",
            //     "timestamp": "2024-09-03T00:32:45.960Z"
            // }
        ]
    },
    reducers: {
        setFilterMessage: (state, action) => {
            return {...state, filter: action.payload}
        },
        addMessageToList: (state, action) => {
            return {...state, list: [...state.list, {...action.payload}]}
        },
        removeMessageFromList: (state, action) => {
            state = state.filter(product => product.id !== action.payload.id)
            return state
        }
    }
})

export const {addMessageToList, removeMessageFromList, setFilterMessage} = MessageSlice.actions

export default MessageSlice.reducer