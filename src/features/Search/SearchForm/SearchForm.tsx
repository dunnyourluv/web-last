import { useState } from "react";
import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input/Input";
import styles from "./SearchForm.module.scss";
import SelectType from "../../../components/common/SelectType/SelectType";
import SelectLocation from "../../../components/SelectLocation/SelectionLocation";

interface SearchFormProps {
    onClick?: (value: {
        keyword: string;
        type: string;
        location: string;
    }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onClick }) => {
    const [keyword, setKeyword] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    return (
        <form action="#" className={styles.form}>
            <ul className={styles.formGroup}>
                <li className={styles.formItem}>
                    <Input
                        type="text"
                        label="Từ khoá"
                        border="bottom"
                        onValueChange={setKeyword}
                    />
                </li>
                <li className={styles.formItem}>
                    <SelectType onChange={setType} />
                </li>
                <li className={styles.formItem}>
                    <SelectLocation onChange={setLocation} />
                </li>
                <li className={styles.formItem}>
                    <Button
                        type="primary-brightness"
                        onClick={(e) => {
                            e.preventDefault();
                            onClick && onClick({ keyword, type, location });
                        }}
                    >
                        <i className="fas fa-search"></i>
                        <span>Tìm kiếm</span>
                    </Button>
                </li>
            </ul>
        </form>
    );
};

export default SearchForm;
