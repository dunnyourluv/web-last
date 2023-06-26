import styles from "./Footer.module.scss";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
    return (
        <div className={styles.footer}>
            <div className="wrapper">
                <div className={styles.content}>
                    <p>
                        <span>© 2023</span>{" "}
                        <span>
                            <a href="#">DDUV Team</a>
                        </span>
                    </p>
                    <p>
                        Trường Đại học Công nghệ Thông tin và Truyền Thông Việt
                        Hàn
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
