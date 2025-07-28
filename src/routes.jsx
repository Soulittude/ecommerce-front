import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import NavBar from "./components/NavBar.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Product from "./pages/Product.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import SearchPage from "./pages/SearchPage.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:slug" element={<Product />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
