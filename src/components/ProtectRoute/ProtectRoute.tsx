import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../app/store";

interface ProtectRouteProps {
    children: React.ReactNode;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    return user ? children : <Navigate to={"/login"} />;
};

export default ProtectRoute;
