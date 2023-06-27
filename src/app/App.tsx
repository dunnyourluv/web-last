import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import useRoute from "../routes/hook";
import NotFound from "../pages/404/NotFound";
const App: React.FC<{}> = () => {
    const { generateRoutes, getRoute } = useRoute();
    const { privateRoutes, publicRoutes } = getRoute();
    return (
        <Router>
            <Routes>
                {generateRoutes(publicRoutes)}
                {generateRoutes(privateRoutes, true)}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
