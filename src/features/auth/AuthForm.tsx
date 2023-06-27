import { useEffect, useState } from "react";
import Alter from "../../components/common/Alter/Alter";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import styles from "./AuthForm.module.scss";
import { LoginUser, RegisterUser } from "../../types/auth.type";
import Validate from "../../utils/Validate";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
interface AuthFormProps {
    type?: "login" | "register";
    onLoginSubmit?: (data: LoginUser) => void;
    onRegisterSubmit?: (data: RegisterUser) => void;
    error?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
    type = "login",
    onRegisterSubmit,
    onLoginSubmit,
    error: initError,
}) => {
    const loginError = useSelector(
        (state: RootState) => state.auth.login.error,
    );

    const [error, setError] = useState<string>(initError || "");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");

    useEffect(() => {
        setError(loginError || initError || "");
    }, [loginError]);

    const handlerLoginSubmit = () => {
        if (!Validate.isEmail(email)) {
            setError("Email không hợp lệ");
            return;
        }

        if (!Validate.isPassword(password)) {
            setError("Password phải có ít nhất 8 ký tự");
            return;
        }

        setError("");

        onLoginSubmit && onLoginSubmit({ email, password });
    };

    const handlerRegisterSubmit = () => {
        if (!Validate.isPassword(password)) {
            setError("Password phải có ít nhất 8 ký tự");
            return;
        }

        if (password !== confirmPassword) {
            setError("Password không trùng khớp");
            return;
        }

        if (!Validate.isEmail(email)) {
            setError("Email không hợp lệ");
            return;
        }

        if (!Validate.isPhone(phoneNumber)) {
            setError("Số điện thoại không hợp lệ");
            return;
        }

        setError("");

        onRegisterSubmit &&
            onRegisterSubmit({
                email: email,
                name: fullName,
                password: password,
                phone: phoneNumber,
            });
    };

    return (
        <div className={styles.authForm}>
            <div className="wrapper">
                <div className={styles.content}>
                    {error && (
                        <div className={styles.error}>
                            <Alter type="error" message={error} />
                        </div>
                    )}
                    <div className={styles.title}>
                        {type === "login" ? "Đăng nhập" : "Đăng ký"}
                    </div>
                    <form action="#" className={styles.form}>
                        <ul className={styles.formGroup}>
                            {type === "register" && (
                                <li className={styles.formItem}>
                                    <Input
                                        border="bottom"
                                        label="Tên"
                                        onValueChange={(value) => {
                                            setFullName(value);
                                        }}
                                    />
                                </li>
                            )}
                            <li className={styles.formItem}>
                                <Input
                                    border="bottom"
                                    label="Gmail"
                                    onValueChange={(value) => {
                                        setEmail(value);
                                    }}
                                />
                            </li>
                            {type === "register" && (
                                <li className={styles.formItem}>
                                    <Input
                                        border="bottom"
                                        label="Số điện thoại"
                                        onValueChange={(value) => {
                                            setPhoneNumber(value);
                                        }}
                                    />
                                </li>
                            )}
                            <li className={styles.formItem}>
                                <Input
                                    border="bottom"
                                    type="password"
                                    label="Mật khẩu"
                                    onValueChange={(value) => {
                                        setPassword(value);
                                    }}
                                />
                            </li>
                            {type === "register" && (
                                <li className={styles.formItem}>
                                    <Input
                                        border="bottom"
                                        type="password"
                                        label="Nhập lại mật khẩu"
                                        onValueChange={(value) => {
                                            setConfirmPassword(value);
                                        }}
                                    />
                                </li>
                            )}
                            <li className={styles.formItem}>
                                <Button
                                    type="primary-brightness"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        type === "login"
                                            ? handlerLoginSubmit()
                                            : handlerRegisterSubmit();
                                    }}
                                >
                                    <i className="fa-solid fa-user"></i>
                                    <span>
                                        {type === "login"
                                            ? "Đăng nhập"
                                            : "Đăng ký"}
                                    </span>
                                </Button>
                            </li>
                            <li className={styles.label}>
                                <p className={styles.line}></p>
                                <p>Hoặc tiếp tục với</p>
                                <p className={styles.line}></p>
                            </li>
                            <li
                                className={`${styles.formItem} ${styles.formButtons}`}
                            >
                                <Button type="outline-gray">
                                    <i className="fab fa-google"></i>
                                    <span>Google</span>
                                </Button>
                                <Button type="outline-gray">
                                    <i className="fab fa-facebook"></i>
                                    <span>Facebook</span>
                                </Button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
