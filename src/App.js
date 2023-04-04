import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
// pages
import {Home, Category, Cart} from "./pages/index";
// components
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import store from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <BrowserRouter>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/category/:id/:numberPage" element = {<Category />} />
            <Route path = "/cart" element = {<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
