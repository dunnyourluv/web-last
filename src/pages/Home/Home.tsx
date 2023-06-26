import { useNavigate } from "react-router-dom";
import SearchForm from "../../features/Search/SearchForm/SearchForm";
import styles from "./Home.module.scss";

const Head = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.head}>
            <div className={styles.overlay}></div>
            <div className="wrapper">
                <div className={styles.content}>
                    <div className={styles.textContent}>
                        <h1>Tìm đồ thất lạc trực tuyến</h1>
                        <h3>Tìm đồ thất lạc của bạn ở bất cứ nơi đâu</h3>
                    </div>
                    <div className={styles.searchForm}>
                        <SearchForm  onClick={(data) => {
                            navigate("/search", {state: data})
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Home: React.FC = () => {
    return (
        <div className={styles.home}>
            <Head />
        </div>
    );
};

export default Home;
