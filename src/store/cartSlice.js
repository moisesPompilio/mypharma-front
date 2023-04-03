import { createSlice } from "@reduxjs/toolkit";

import { readCartFromLocalStorage, writeCartToLocalStorage } from "../utils/localStorage";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: readCartFromLocalStorage(),
        totalItems: 0,
        totalAmount: 0,
        deliveryCharge: 20
    }, 
    reducers: {
        addToCart(state, action){
            const tempItem = state.data.find(item => item.id === action.payload.id);
            if(tempItem){
                const tempCart = state.data.map(item => {
                    if(item.id === action.payload.id){
                        let newQty = item.quantity + action.payload.quantity;
                        let newTotalPrice = newQty * item.price;
                        return { ...item, quantity: newQty, totalPrice: newTotalPrice };
                    } else {
                        return item;
                    }
                });
                state.data = tempCart;
                writeCartToLocalStorage(state.data);
            } else {
                state.data.push(action.payload);
                writeCartToLocalStorage(state.data);
            }
        },
        removeFromCart(state, action){
            const tempCart = state.data.filter(item => item.id !== action.payload);
            state.data = tempCart;
            writeCartToLocalStorage(state.data);
        },
        clearCart(state){
            state.data = [];
            writeCartToLocalStorage(state.data);
        },
        toggleCartQty(state, action){
            const tempCart = state.data.map(item => {
                if(item.id === action.payload.id){
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;
                    if(action.payload.type === "INC"){
                        tempQty++;
                        tempTotalPrice = tempQty * item.price;
                    }
                    if(action.payload.type === "DEC"){
                        tempQty--;
                        if(tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.price;
                    }
                    return {...item, quantity: tempQty, totalPrice: tempTotalPrice};
                } else {
                    return item;
                }
            });
            state.data = tempCart;
            writeCartToLocalStorage(state.data);
        },
        getCartTotal(state){
            state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.totalPrice;
            }, 0);
            state.totalItems = state.data.length;
        }
    }
});

export const {addToCart, removeFromCart, toggleCartQty, getCartTotal, clearCart} = cartSlice.actions;
export default cartSlice.reducer;