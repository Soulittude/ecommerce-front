import React from "react";
import { useCategories } from "../hooks/queries";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Categories() {
  const location = useLocation();
  const { data: categories = [], isLoading, isError } = useCategories();
  const activeCategory = location.pathname.startsWith("/category/")
    ? location.pathname.split("/")[2]
    : null;

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Error loading categories: {isError.message}</div>;
  }

  return (
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
                to={`/category/${cat.slug}`}
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
  );
}
