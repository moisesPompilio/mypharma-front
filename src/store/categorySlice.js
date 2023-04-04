import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

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

export const fetchProductsByCategory = (categoryID, dataType, numberPage) => {
    return async function fetchCategoryProductThunk(dispatch){
        if(dataType === 'all') dispatch(setCategoriesStatusAll(STATUS.LOADING));
        if(dataType === 'single') dispatch(setCategoriesStatusSingle(STATUS.LOADING));
        if(numberPage === undefined || numberPage === null || numberPage <= 0) numberPage = 1
        
        try{
            if(dataType === 'all'){
                const response = await fetch(`${BASE_URL}product?categoryId=${categoryID}&pageNumber=${numberPage}&pageSize=10`);
                const data = await response.json();
                dispatch(setCategoriesProductAll(data));
                dispatch(setCategoriesStatusAll(STATUS.IDLE));
            }
            if(dataType === 'single'){
                const response = await fetch(`${BASE_URL}product?categoryId=${categoryID}&pageNumber=${numberPage}`);
                const data = await response.json();
                dispatch(setCategoriesProductSingle(data));
                dispatch(setCategoriesStatusSingle(STATUS.IDLE));
            }
        } catch(error){
            dispatch(setCategoriesStatusAll(STATUS.ERROR));
        }
    }
}