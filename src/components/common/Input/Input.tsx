import React, { useEffect, useRef, useState } from "react";
import styles from "./Input.module.scss";

type InputProps = {
    placeholder?: string;
    type?:
        | "text"
        | "password"
        | "email"
        | "number"
        | "tel"
        | "url"
        | "search"
        | "date"
        | "datetime-local"
        | "time"
        | "week"
        | "month"
        | "textarea";
    className?: string;
    border?: "none" | "bottom" | "all";
    icon?: React.ReactNode;
    label?: string;
    currentInputClassName?: string;
    focusEffect?: boolean;
    onValueChange?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
    className,
    border = "none",
    icon,
    label,
    currentInputClassName,
    focusEffect = false,
    onChange,
    onValueChange,
    ...props
}) => {
    const [focus, setFocus] = useState(false);
    const [labelFocus, setLabelFocus] = useState(false);
    const [value, setValue] = useState<string>(props.value ? props.value + "" : "");
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    let currentClassName = [styles.input];
    useEffect(() => {
        if (onValueChange) onValueChange(value);
    }, [value]);

    if (className) currentClassName.push(className);
    if (border) currentClassName.push(styles[border]);
    if (focus) currentClassName.push(styles.focus);
    if (labelFocus) {
        currentClassName.push(styles.labelFocus);
    }

    const labelHandlerClick = () => {
        if (inputRef.current) inputRef.current.focus();
        if (textareaRef.current) textareaRef.current.focus();
    };

    return (
        <div className={currentClassName.join(" ")}>
            {icon && <div className={styles.icon}>{icon}</div>}
            {label && (
                <label
                    className={`${styles.label} ${
                        labelFocus || value ? styles.focus : ""
                    }`}
                    onClick={labelHandlerClick}
                >
                    {label}
                </label>
            )}
            {props.type !== "textarea" ? (
                <input
                    value={value}
                    ref={inputRef}
                    onFocus={(e) => {
                        if (focusEffect) setFocus(true);
                        if (props.onFocus) props.onFocus(e);
                        if (label) setLabelFocus(true);
                    }}
                    onBlur={(e) => {
                        if (focusEffect) setFocus(false);
                        if (props.onBlur) props.onBlur(e);
                        if (label) setLabelFocus(false);
                    }}
                    onChange={(e) => {
                        if (onChange) onChange(e);
                        setValue(e.target.value);
                    }}
                    type="text"
                    className={`${styles.currentInput} ${
                        currentInputClassName || ""
                    }`}
                    {...props}
                />
            ) : (
                <textarea
                    value={value}
                    ref={textareaRef}
                    onFocus={(e) => {
                        if (focusEffect) setFocus(true);
                        if (props.onFocus) props.onFocus(e as any);
                        if (label) setLabelFocus(true);
                    }}
                    onBlur={(e) => {
                        if (focusEffect) setFocus(false);
                        if (props.onBlur) props.onBlur(e as any);
                        if (label) setLabelFocus(false);
                    }}
                    onChange={(e) => {
                        if (onChange) onChange(e as any);
                        setValue(e.target.value);
                    }}
                    className={`${styles.currentInput} ${
                        currentInputClassName || ""
                    } ${styles.textarea}`}
                />
            )}
        </div>
    );
};

export default Input;
