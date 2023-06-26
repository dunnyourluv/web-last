import { useEffect, useState } from "react";
import styles from "./Select.module.scss";
interface SelectProps {
    options: {
        value: string;
        label: string;
    }[];
    option?: string;
    border?: "none" | "bottom" | "all";
    className?: string;
    onChange?: (value: string) => void;
}
interface OptionProps {
    children?: React.ReactNode;
    onClick?: () => void;
    isSelected?: boolean;
}

export const Option: React.FC<OptionProps> = ({
    children,
    isSelected,
    onClick,
}) => {
    return (
        <li
            className={`${styles.option} ${isSelected ? styles.selected : ""}`}
            onClick={onClick}
        >
            {children}
        </li>
    );
};

const Select: React.FC<SelectProps> = ({
    options,
    border,
    className,
    onChange,
    option,
}) => {
    const [currentOption, setCurrentOption] = useState(
        option
            ? options.find((item) => item.value === option) || options[0]
            : options[0],
    );
    const [focus, setFocus] = useState(false);
    const currentClassName = [styles.select];

    const handlerSelectClick = (index: number) => {
        setCurrentOption(options[index]);
        setFocus(false);
    };

    const handlerParentClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        if (e.target !== e.currentTarget) return;
        setFocus(!focus);
    };

    useEffect(() => {
        if (onChange) onChange(currentOption.value);
    }, [currentOption]);

    if (focus) currentClassName.push(styles.focus);
    if (border) currentClassName.push(styles[border]);

    return (
        <div
            className={`${currentClassName.join(" ")} ${className || ""}`}
            onClick={handlerParentClick}
        >
            <p className={styles.label} onClick={handlerParentClick}>
                {currentOption.label}
            </p>
            <div className={styles.logo}>
                <i className="fas fa-chevron-down"></i>
            </div>
            {focus && (
                <ul className={styles.list}>
                    {options.map((option, index) => {
                        return (
                            <Option
                                isSelected={
                                    option.value === currentOption.value
                                }
                                key={index}
                                onClick={() => handlerSelectClick(index)}
                            >
                                {option.label}
                            </Option>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Select;
