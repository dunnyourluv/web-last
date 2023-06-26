import styles from "./Alter.module.scss";

interface AlterProps {
    type?: "error" | "success" | "warning" | "info";
    message?: string;
}

const getIcon = (type: "error" | "success" | "warning" | "info") => {
    switch (type) {
        case "error":
            return "fa-circle-exclamation";
        case "success":
            return "fa-circle-check";
        case "warning":
            return "fa-circle-exclamation";
        case "info":
            return "fa-circle-info";
        default:
            return "fa-circle-check";
    }
};

const Alter: React.FC<AlterProps> = ({ type = "success", message }) => {
    return (
        <div className={`${styles.alter} ${styles[type]}`}>
            <i className={`fa-solid ${getIcon(type)} ${styles.icon}`}></i>
            <span> </span>
            <span className={styles.message}>
                <span
                    style={{
                        fontWeight: "bold",
                    }}
                >
                    {type?.charAt(0).toUpperCase() + type?.slice(1)}:
                </span>
                <span> {message}</span>
            </span>
        </div>
    );
};

export default Alter;
