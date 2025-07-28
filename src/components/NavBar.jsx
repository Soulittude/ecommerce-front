import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  LogIn,
  LogOut,
  User,
  UserPlus,
  Heart,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = Boolean(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Reset search input when navigating away from search page
  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchQuery("");
    }
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-xl mx-auto flex h-14 items-center">
        <Link to="/" className="font-bold mr-4">
          MyStore
        </Link>
        <form onSubmit={handleSearch} className="flex-1 mx-4">
          <div className="relative max-w-3xl w-full">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
        </form>

        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <Button
              variant="outline"
              onClick={() => {
                dispatch(logout());
              }}
              className="flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <div className="relative group">
              <Button
                variant="outline"
                onClick={() => navigate("/auth?tab=login")}
                className="relative z-10 flex items-center"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login / Register
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/auth?tab=login")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/auth?tab=register")}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Button>
              </div>
            </div>
          )}
          <Button asChild variant="ghost">
            <Link to="/favorites" className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              Favorites
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/cart" className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
