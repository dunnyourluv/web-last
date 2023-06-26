import { useEffect, useState } from "react";
import Button from "../../components/common/Button/Button";
import FormUploadImage from "../../components/common/FormUploadImage/FormUploadImage";
import Input from "../../components/common/Input/Input";
import styles from "./UploadPost.module.scss";
import SelectType from "../../components/common/SelectType/SelectType";
import Alter from "../../components/common/Alter/Alter";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface DataUploadPost {
    title: string;
    location: string;
    description: string;
    images: File[];
    type: string;
}

interface UploadPostProps {
    onUploadPost?: (data: DataUploadPost) => void;
}

const UploadPost: React.FC<UploadPostProps> = ({ onUploadPost }) => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState("");
    const upload = useSelector((state: RootState) => state.produce.upload);

    useEffect(() => {
        if (upload.success) {
            setTitle("");
            setLocation("");
            setDescription("");
            setType("");
            setImages([]);
        }
        if (upload.error) {
            setError(upload.error);
        }
    }, [upload]);

    return (
        <div className={styles.uploadPost}>
            {error && (
                <div className={styles.error}>
                    <Alter type="error" message={error} />
                </div>
            )}
            {upload.success && (
                <div className={styles.error}>
                    <Alter type="success" message={upload.success} />
                </div>
            )}
            <div className={styles.header}>
                <h1>Đăng tin thất lạc</h1>
            </div>
            <div className={styles.body}>
                <div className={styles.form}>
                    <ul className={styles.formGroup}>
                        <li className={styles.formItem}>
                            <SelectType onChange={setType} />
                        </li>
                        <li className={styles.formItem}>
                            <Input
                                border="bottom"
                                label="Tiêu đề"
                                onValueChange={setTitle}
                            />
                        </li>
                        <li className={styles.formItem}>
                            <Input
                                border="bottom"
                                label="Địa điểm"
                                onValueChange={setLocation}
                            />
                        </li>
                        <li className={styles.formItem}>
                            <Input
                                border="bottom"
                                label="Mô tả"
                                type="textarea"
                                onValueChange={setDescription}
                            />
                        </li>
                        <div className={styles.formItem}>
                            <FormUploadImage onChange={setImages} />
                        </div>
                        <div className={`${styles.formItem} ${styles.buttons}`}>
                            <Button
                                type="primary-brightness"
                                onClick={() => {
                                    if (onUploadPost) {
                                        if (title === "") {
                                            setError(
                                                "Tiêu đề không được để trống",
                                            );
                                            return;
                                        }

                                        if (location === "") {
                                            setError(
                                                "Địa điểm không được để trống",
                                            );
                                            return;
                                        }

                                        if (description === "") {
                                            setError(
                                                "Mô tả không được để trống",
                                            );
                                            return;
                                        }
                                        setError("");
                                        onUploadPost({
                                            title,
                                            location,
                                            description,
                                            images,
                                            type,
                                        });
                                    }
                                }}
                            >
                                <span>Đăng tin</span>
                            </Button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UploadPost;
