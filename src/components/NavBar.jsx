import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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

        <div className="flex flex-2 items-center justify-end space-x-2">
          {isAuthenticated ? (
            <Button
              variant="outline"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate("/auth")}>
                Login
              </Button>
              <Button variant="outline" onClick={() => navigate("/auth")}>
                Register
              </Button>
            </>
          )}
          <Button asChild variant="ghost" size="icon" className="ml-auto">
            <Link to="/cart">
              <ShoppingCart className="size-4" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
