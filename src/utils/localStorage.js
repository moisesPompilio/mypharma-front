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

const TOTAL_PAGE_KEY = "totalPage"

export const readTotalPageFromLocalStorage = () => {
  try {
    const totalPage = localStorage.getItem(TOTAL_PAGE_KEY);
    return totalPage ? JSON.parse(totalPage) : 1;
  } catch (error) {
    console.error('Error reading totalPage from local storage', error);
    return 1;
  }
};

export const writeTotalPageToLocalStorage = (totalPage) => {
  try {
    localStorage.setItem(TOTAL_PAGE_KEY, JSON.stringify(totalPage));
  } catch (error) {
    console.error('Error writing totalPage to local storage', error);
  }
};