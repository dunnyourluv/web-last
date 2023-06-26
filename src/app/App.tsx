import { BrowserRouter as Router, Routes } from "react-router-dom";
import useRoute from "../routes/hook";
const App: React.FC<{}> = () => {
    const { generateRoutes, getRoute } = useRoute();
    const { privateRoutes, publicRoutes } = getRoute();
    return (
        <Router>
            <Routes>
                {generateRoutes(publicRoutes)}
                {generateRoutes(privateRoutes, true)}
            </Routes>
        </Router>
    );
};

export default App;
