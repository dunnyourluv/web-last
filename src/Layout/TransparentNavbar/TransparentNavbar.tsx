import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./TransparentNavbar.module.scss";
import Footer from "../../components/Footer/Footer";
interface TransparentNavbarProps {
    children: React.ReactNode;
}

const TransparentNavbar: React.FC<TransparentNavbarProps> = ({ children }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const handlerScroll = () => {
            if (window.scrollY > 89) {
                setActive(true);
            } else {
                setActive(false);
            }
        };
        window.addEventListener("scroll", handlerScroll);
        return () => {
            window.removeEventListener("scroll", handlerScroll);
        };
    }, []);

    return (
        <>
            <div className={`${styles.navbar}`}>
                <Navbar transparent={!active} className={styles.navInner} />
            </div>
            <div className={`${styles.content} ${active ? styles.active : ""}`}>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default TransparentNavbar;
