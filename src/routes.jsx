import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import NavBar from "./components/NavBar.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Product from "./pages/Product.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
const Layout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
