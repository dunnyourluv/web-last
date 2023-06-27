import Button from "../../components/common/Button/Button";
import useTitle from "../../hooks/useTitle";
import styles from "./NotFound.module.scss";

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
    useTitle("Not Found");
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h1>Oops!</h1>
                <h2>404 | Không tìm thấy trang này</h2>
                <Button
                    type="primary-brightness"
                    to="/"
                    className={styles.button}
                >
                    Quay lại trang chủ
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
