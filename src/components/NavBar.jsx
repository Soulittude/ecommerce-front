import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  LogIn,
  LogOut,
  User,
  UserPlus,
  Heart,
} from "lucide-react";
import { useCategories } from "../hooks/queries";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function NavBar() {
  const [searchParams] = useSearchParams();
  const { data: categories = [], isLoading, isError } = useCategories();
  const activeCategory = searchParams.get("category");
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = Boolean(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-xl mx-auto flex h-14 justify-between">
        <div className="flex items-center">
          <Link to="/" className="font-bold">
            MyStore
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {isLoading && <NavigationMenuItem>Loading...</NavigationMenuItem>}
              {isError && (
                <NavigationMenuItem className="text-destructive">
                  Error loading categories
                </NavigationMenuItem>
              )}

              {!isLoading &&
                !isError &&
                categories.map((cat) => (
                  <NavigationMenuItem key={cat.slug}>
                    <Link
                      to={`/?category=${cat.slug}`}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        activeCategory === cat.slug &&
                          "bg-accent text-accent-foreground",
                      )}
                    >
                      {cat.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2 ml-auto">
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
