import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: (
        e:
            | React.MouseEvent<HTMLAnchorElement, MouseEvent>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => void;
    href?: string;
    type?:
        | "primary"
        | "reverse"
        | "outline"
        | "transparent"
        | "transparent-reverse"
        | "primary-brightness"
        | "outline-gray";
    to?: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    type,
    onClick,
    to,
    href,
    className,
}) => {
    const currentClassName: string[] = [styles.button];
    const Comp = to ? Link : href ? "a" : "button";
    if (className) currentClassName.push(className);
    switch (type) {
        case "primary":
            currentClassName.push(styles.primary);
            break;
        case "reverse":
            currentClassName.push(styles.reverse);
            break;
        case "outline":
            currentClassName.push(styles.outline);
            break;
        case "transparent":
            currentClassName.push(styles.transparent);
            break;
        case "transparent-reverse":
            currentClassName.push(styles.transparentReverse);
            break;
        case "primary-brightness":
            currentClassName.push(styles.primaryBrightness);
            break;
        case "outline-gray":
            currentClassName.push(styles.outlineGray);
            break;
        default:
            currentClassName.push(styles.primary);
            break;
    }

    return (
        <Comp
            to={to || "/"}
            onClick={onClick}
            className={currentClassName.join(" ")}
        >
            {children}
        </Comp>
    );
};

export default Button;
