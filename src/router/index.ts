import { RouteData } from "../utils/types";
import { Home } from "../pages/home";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Profile } from "../pages/profile";
import { NotFound } from "../pages/NotFound";

export const routes: RouteData[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
    element: Home,
    type: "public",
  },
  {
    id: "login",
    title: "Login",
    path: "/login",
    element: Login,
    type: "public",
  },
  {
    id: "register",
    title: "Register",
    path: "/register",
    element: Register,
    type: "public",
  },
  {
    id: "profile",
    title: "Profile",
    path: "/profile",
    element: Profile,
    type: "protected",
  },
  {
    id: "notFound",
    path: "*",
    element: NotFound,
    type: "public",
  },
];
