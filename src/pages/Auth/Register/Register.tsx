import { useDispatch } from "react-redux";
import AuthForm from "../../../features/auth/AuthForm";
import styles from "./Register.module.scss";
import { v4 as uuidv4 } from "uuid";
import { registerSuccess } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
    useTitle("Register");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className={styles.register}>
            <div className="wrapper">
                <div className={styles.content}>
                    <AuthForm
                        onRegisterSubmit={(data) => {
                            dispatch(
                                registerSuccess({
                                    id: uuidv4(),
                                    ...data,
                                }),
                            );

                            navigate("/login");
                        }}
                        type="register"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
