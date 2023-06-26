import TransparentNavbar from "../Layout/TransparentNavbar/TransparentNavbar";
import { LoginPage, RegisterPage } from "../pages/Auth";
import Blog from "../pages/Blog/Blog";
import Detail from "../pages/Detail/Detail";
import Home from "../pages/Home/Home";
import SearchPage from "../pages/Search/SearchPage";
import UploadPostPage from "../pages/UploadPost/UploadPostPage";
import { Route } from "../types/route.type";

export const publicRoutes: Route[] = [
    {
        element: Home,
        path: "/",
        layout: TransparentNavbar,
    },
    {
        element: LoginPage,
        path: "/login",
    },
    {
        element: RegisterPage,
        path: "/register",
    },
    {
        element: SearchPage,
        path: "/search",
    },
    {
        element: Detail,
        path: "/detail/:id",
        layout: TransparentNavbar,
    },
    {
        element: Blog,
        path: "/blogs",
    },
];

export const privateRoutes: Route[] = [
    {
        element: UploadPostPage,
        path: "/post/upload",
    },
];
