const CART_KEY = 'cart';

export const readCartFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem(CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error reading cart from local storage', error);
    return [];
  }
};

export const writeCartToLocalStorage = (cartData) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartData));
  } catch (error) {
    console.error('Error writing cart to local storage', error);
  }
};