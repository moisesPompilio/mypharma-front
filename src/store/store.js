import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import modalReducer from "./modalSlice";
import cartReducer from "./cartSlice";
import setSeachProductsByName from "./searchProductByNameSlice";
import totalPageSlice from "./totalPageSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        modal: modalReducer,
        cart: cartReducer,
        seachProductsByName: setSeachProductsByName,
        totalPage: totalPageSlice
    }
});

export default store;