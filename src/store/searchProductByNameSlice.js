import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";
import { orderingToQueryParam } from "../utils/orderingToQueryParam";
import { writeTotalPageToLocalStorage } from "../utils/localStorage";

const seachProductsByName = createSlice({
    name: "seachProductsByName",
    initialState: {
        data: [],
        status: STATUS.IDLE,
    },

    reducers: {
        setSeachProductsByName(state, action){
            state.data = action.payload;
        },
        setStatus(state, action){
            state.status = action.payload;
        },
    },
});

export const {setSeachProductsByName, setStatus} = seachProductsByName.actions;
export default seachProductsByName.reducer;

export const fetchSeachProducts = (seachProductsByName, numberPage, ordering) => {
    return async function fetchProductThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING));
        try{
            const response = await fetch(`${BASE_URL}product?searchByName=${seachProductsByName}&pageNumber=${numberPage}&${orderingToQueryParam(ordering)}`);
            const data = await response.json();
            dispatch(setSeachProductsByName(data.products));
            dispatch(setStatus(STATUS.IDLE));
            writeTotalPageToLocalStorage(data.totalPages)
        } catch(error){
            dispatch(setStatus(STATUS.ERROR));
        }
    }
}
