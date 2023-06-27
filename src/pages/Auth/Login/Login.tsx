import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../../features/auth/AuthForm";
import styles from "./Login.module.scss";
import { RootState } from "../../../app/store";
import { loginFailure, loginSuccess } from "../../../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import { useEffect, useState } from "react";
interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
    useTitle("Login");
    const users = useSelector((state: RootState) => state.auth.listUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    return (
        <div className={styles.login}>
            <div className="wrapper">
                <div className={styles.content}>
                    <AuthForm
                        error={state?.message}
                        onLoginSubmit={(data) => {
                            const user = users.find(
                                (user) =>
                                    user.email === data.email &&
                                    user.password === data.password,
                            );
                            if (!user) {
                                dispatch(
                                    loginFailure(
                                        "Email hoặc mật khẩu không đúng",
                                    ),
                                );
                            } else {
                                dispatch(loginSuccess(user));
                                navigate("/");
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
