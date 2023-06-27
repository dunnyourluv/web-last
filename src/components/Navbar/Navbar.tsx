import styles from "./Navbar.module.scss";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import { useState, createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { User } from "../../types/auth.type";
import { CardType } from "../../types/card.type";
import { logout } from "../../features/auth/authSlice";
interface NavbarProps {
    className?: string;
    transparent?: boolean;
}

const NavbarContent = createContext<{
    searchValue?: string;
    setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
    user: User | null;
}>({
    user: null,
});

const Logout = (user: User) => {
    const [openModel, setOpenModel] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className={styles.logout}>
            <p
                onClick={() => {
                    setOpenModel(!openModel);
                }}
            >
                {user.name}
            </p>
            <div
                className={`${styles.model} ${openModel ? styles.open : ""}`}
                onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                }}
            >
                <Button type="outline">Đăng xuất</Button>
            </div>
        </div>
    );
};

const SearchResult: React.FC<{
    className?: string;
    results: CardType[];
}> = ({ results }) => {
    const { setSearchValue } = useContext(NavbarContent);

    if (!setSearchValue) throw new Error("Missing search value context");

    const handlerClick = () => {
        setSearchValue("");
    };

    return (
        <ul className={styles.searchResults}>
            {results.map((card, index) => {
                return (
                    <li className={styles.searchResultItem} key={index}>
                        <Link to={`/detail/${card.id}`} onClick={handlerClick}>
                            {card.title}
                        </Link>
                    </li>
                );
            })}
            <div className={styles.viewAllBtn}>
                <Link to={"/search"} onClick={handlerClick}>
                    Xem tất cả
                </Link>
            </div>
        </ul>
    );
};

const MobileMenu: React.FC<{
    show: boolean;
    onClose: () => void;
}> = ({ show, onClose }) => {
    const { user, searchValue, setSearchValue } = useContext(NavbarContent);

    const handlerItemClick = () => {
        onClose();
    };

    return (
        <div className={`${styles.mobileMenu} ${show ? styles.show : ""}`}>
            <div className={styles.mobileHead} onClick={onClose}>
                <div className={styles.closeBtn}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>
            <div className={styles.mobileBody}>
                <ul className={styles.menu}>
                    <li
                        className={styles.mobileMenuItem}
                        onClick={handlerItemClick}
                    >
                        <i className="fa-solid fa-house"></i>
                        <Link to={"/"}>Trang chủ</Link>
                    </li>
                    <li
                        className={styles.mobileMenuItem}
                        onClick={handlerItemClick}
                    >
                        <i className="fa-brands fa-wpexplorer"></i>
                        <Link to={"/search"}>Tìm kiếm</Link>
                    </li>
                    <li
                        className={styles.mobileMenuItem}
                        onClick={handlerItemClick}
                    >
                        <i className="fa-solid fa-store"></i>
                        <Link to={"/blogs"}>Blog</Link>
                    </li>
                </ul>
                <div className={styles.button}>
                    <Button className={styles.buttonInner} to="/post/upload">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>Đăng tin</span>
                    </Button>
                </div>
                <div className={styles.auth}>
                    <i className="fa-solid fa-user"></i>
                    {user ? (
                        <Logout {...user} />
                    ) : (
                        <>
                            <Link to={"/login"}>Đăng nhập</Link>
                            <span> or </span>
                            <Link to={"/register"}>Đăng ký</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const Navbar: React.FC<NavbarProps> = ({ className, transparent }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchFocus, setSearchFocus] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState<CardType[]>([]);
    const user = useSelector((state: RootState) => state.auth.user);
    const cards = useSelector((state: RootState) => state.produce.cards);
    const handlerToggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const handlerSearch = (value: string) => {
        if (value) {
            const results = cards.filter((card) => {
                return card.title.toLowerCase().includes(value.toLowerCase());
            });
            setSearchResults(results);
        }
    };

    useEffect(() => {
        handlerSearch(searchValue);
        if (searchValue.length > 0) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [searchValue]);

    return (
        <NavbarContent.Provider
            value={{
                searchValue,
                setSearchValue,
                user,
            }}
        >
            <div
                className={`${styles.navbar} ${className || ""} ${
                    (transparent && styles.transparent) || ""
                }`}
            >
                <div className={styles.headerTop}>
                    <div className={styles.bar}>
                        <Button
                            onClick={() => setShowMobileMenu(true)}
                            className={styles.barBtn}
                            type="transparent-reverse"
                        >
                            <i className="fa-solid fa-bars"></i>
                        </Button>
                    </div>
                    <div className={styles.logo}>
                        <Link to={"/"}>
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className={styles.search}>
                        <Input
                            type="search"
                            currentInputClassName={styles.searchInput}
                            className={styles.input}
                            placeholder="Bạn đang muốn tìm gì?"
                            border="none"
                            icon={<i className="fa-solid fa-search"></i>}
                            onValueChange={(value) => {
                                setSearchValue(value);
                            }}
                        />
                        {searchValue && (
                            <SearchResult results={searchResults} />
                        )}
                    </div>
                    <div className={styles.headerRight}>
                        <ul className={styles.menu}>
                            <li className={styles.menuItem}>
                                <Link to={"/"}>Trang chủ</Link>
                            </li>
                            <li className={styles.menuItem}>
                                <Link to={"/search"}>Tìm kiếm</Link>
                            </li>
                            <li className={styles.menuItem}>
                                <Link to={"/blogs"}>Blog</Link>
                            </li>
                        </ul>
                        <div className={styles.auth}>
                            <i className="fa-solid fa-user"></i>
                            {user ? (
                                <Logout {...user} />
                            ) : (
                                <>
                                    <Link to={"/login"}>Đăng nhập</Link>
                                    <span> or </span>
                                    <Link to={"/register"}>Đăng ký</Link>
                                </>
                            )}
                        </div>
                        <div className={styles.button}>
                            <Button
                                className={styles.postBtn}
                                type="reverse"
                                to="/post/upload"
                            >
                                <i className="fa-solid fa-location-dot"></i>
                                <span>Post</span>
                            </Button>
                            <Button
                                className={styles.searchBtn}
                                onClick={handlerToggleSearch}
                            >
                                <i className="fa-solid fa-search"></i>
                            </Button>
                        </div>
                    </div>
                </div>
                <div
                    className={`${styles.mobileSearch} ${
                        showSearch ? styles.show : ""
                    } ${searchFocus ? styles.focus : ""}`}
                >
                    <div className={styles.inputContainer}>
                        <Input
                            className={styles.input}
                            onValueChange={(value) => {
                                setSearchValue(value);
                            }}
                            onFocus={() => setSearchFocus(true)}
                            onBlur={() => {
                                setSearchFocus(false);
                            }}
                            placeholder="Bạn đang tìm kiếm gì?"
                        />
                        <div
                            className={styles.closeBtn}
                            onClick={handlerToggleSearch}
                        >
                            <i className="fa-solid fa-times"></i>
                        </div>
                    </div>
                    <div className={styles.searchRs}>
                        {searchValue && showSearch && (
                            <SearchResult results={searchResults} />
                        )}
                    </div>
                </div>
                {showSearch && <div className={styles.searchOverlay}></div>}
                <MobileMenu
                    show={showMobileMenu}
                    onClose={() => {
                        setShowMobileMenu(false);
                    }}
                />
                {showMobileMenu && (
                    <div
                        className={styles.overlay}
                        onClick={() => setShowMobileMenu(false)}
                    ></div>
                )}
            </div>
        </NavbarContent.Provider>
    );
};

export default Navbar;
