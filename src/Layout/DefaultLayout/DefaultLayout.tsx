import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./DefaultLayout.module.scss";
import Footer from "../../components/Footer/Footer";
interface DefaultLayoutProps {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    const [fixed, setFixed] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setFixed(true);
            } else {
                setFixed(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className={`${styles.navbar} ${fixed ? styles.fixed : ""}`}>
                <Navbar className={styles.navInner} />
            </div>
            <div className={`${styles.content} ${fixed ? styles.fixed : ""}`}>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default DefaultLayout;
