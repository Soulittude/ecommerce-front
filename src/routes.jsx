import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Cart from "./pages/Cart.jsx";
import Navbar from "./components/ui/navbar";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}
