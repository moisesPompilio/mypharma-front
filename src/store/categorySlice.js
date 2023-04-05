import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";
import { orderingToQueryParam } from "../utils/orderingToQueryParam";
import { writeTotalPageToLocalStorage } from "../utils/localStorage";


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data: [],
        status: STATUS.IDLE,
        catProductAll : [],
        catProductAllStatus: STATUS.IDLE,
        catProductSingle : [],
        catProductSingleStatus: STATUS.IDLE
    },

    reducers: {
        setCategories(state, action){
            state.data = action.payload;
        },
        setStatus(state, action){
            state.status = action.payload;
        },
        setCategoriesProductAll(state, action){
            state.catProductAll.push(action.payload);
        },
        setCategoriesStatusAll(state, action){
            state.catProductAllStatus = action.payload;
        },
        setCategoriesProductSingle(state, action){
            state.catProductSingle = action.payload;
        },
        setCategoriesStatusSingle(state, action){
            state.catProductSingleStatus = action.payload;
        }
    }
});

export const { setCategories, setStatus, setCategoriesProductAll, setCategoriesStatusAll, setCategoriesProductSingle, setCategoriesStatusSingle } = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = () => {
    return async function fetchCategoryThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING));
        try{
            const response = await fetch(`${BASE_URL}category`);
            const data = await response.json();
            dispatch(setCategories(data));
            dispatch(setStatus(STATUS.IDLE));
        } catch(error){
            dispatch(setStatus(STATUS.ERROR));
        }
    }
}

export const fetchProductsByCategory = (categoryID, dataType, numberPage, ordering) => {
    return async function fetchCategoryProductThunk(dispatch){
        if(dataType === 'all') dispatch(setCategoriesStatusAll(STATUS.LOADING));
        if(dataType === 'single') dispatch(setCategoriesStatusSingle(STATUS.LOADING));
        if(numberPage === undefined || numberPage === null || numberPage <= 0) numberPage = 1;
        
        try{
            if(dataType === 'all'){
                const response = await fetch(`${BASE_URL}product?categoryId=${categoryID}&pageNumber=${numberPage}&pageSize=25`);
                const data = await response.json();
                dispatch(setCategoriesProductAll(data.products));
                dispatch(setCategoriesStatusAll(STATUS.IDLE));
                writeTotalPageToLocalStorage(data.totalPages)
            }
            if(dataType === 'single'){
                const response = await fetch(`${BASE_URL}product?categoryId=${categoryID}&pageNumber=${numberPage}&${orderingToQueryParam(ordering)}`);
                const data = await response.json();
                dispatch(setCategoriesProductSingle(data.products));
                dispatch(setCategoriesStatusSingle(STATUS.IDLE));
                writeTotalPageToLocalStorage(data.totalPages)
            }
        } catch(error){
            dispatch(setCategoriesStatusAll(STATUS.ERROR));
        }
    }
}