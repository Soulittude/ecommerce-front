import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Navbar from "./components/ui/navbar";
import Product from "./pages/Product.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:slug" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
