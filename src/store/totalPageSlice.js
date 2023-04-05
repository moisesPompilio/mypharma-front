import { createSlice } from "@reduxjs/toolkit";
import { readTotalPageFromLocalStorage, writeCartToLocalStorage } from "../utils/localStorage";

const totalPageSlice = createSlice({
    name: "totalPageSlice",
    initialState: {
        data: readTotalPageFromLocalStorage(),
    },

    reducers: {
        setTotalPageSlice(state, action){
            state.data = action.payload;
            writeCartToLocalStorage(state.data)
        }
    },
});

export const {setTotalPageSlice} = totalPageSlice.actions;
export default totalPageSlice.reducer;