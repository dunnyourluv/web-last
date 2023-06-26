import { Fragment } from "react";
import { Route as RouteType } from "../types/route.type";
import { Route } from "react-router-dom";
import ProtectRoute from "../components/ProtectRoute/ProtectRoute";
import { privateRoutes, publicRoutes } from "./index";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
const useRoute = () => {
    const generateRoutes = (
        route: RouteType[],
        protectRoute: boolean = false,
    ) => {
        return route.map((route, index) => {
            const Layout = route.layout
                ? route.layout
                : route.layout === null
                ? Fragment
                : DefaultLayout;
            const ProtectWrapper = protectRoute ? ProtectRoute : Fragment;
            const Comp = route.element;
            return (
                <Route
                    path={route.path}
                    element={
                        <ProtectWrapper>
                            <Layout>
                                <Comp />
                            </Layout>
                        </ProtectWrapper>
                    }
                    key={index}
                />
            );
        });
    };

    const getRoute = () => {
        return {
            privateRoutes: privateRoutes,
            publicRoutes: publicRoutes,
        };
    };

    return {
        generateRoutes,
        getRoute,
    };
};

export default useRoute;
