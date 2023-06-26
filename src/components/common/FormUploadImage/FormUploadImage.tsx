import styles from "./FormUploadImage.module.scss";
import { useEffect, useRef, useState } from "react";
interface FormUploadImageProps {
    multiple?: boolean;
    onChange?: (files: File[]) => void;
}

const FormUploadImage: React.FC<FormUploadImageProps> = ({
    multiple = true,
    onChange,
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const handlerButtonClick = () => {
        inputRef.current?.click();
        console.log("click");
    };

    const handlerRemoveImage = (index: number) => {
        if (files[index]) {
            URL.revokeObjectURL(preview[index]);
            setFiles((files) => files.filter((_, i) => i !== index));
        }
    };

    useEffect(() => {
        setPreview(files.map((file) => URL.createObjectURL(file)));
        if (onChange) onChange(files);
        return () => {
            preview.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [files]);

    return (
        <div className={styles.formUploadImage}>
            <div className={styles.preview}>
                {preview.map((url, index) => {
                    return (
                        <div key={index} className={styles.previewItem}>
                            <img src={url} alt={url} />
                            <div
                                className={styles.remove}
                                onClick={() => handlerRemoveImage(index)}
                            >
                                <i className="fa-solid fa-times"></i>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.button} onClick={handlerButtonClick}>
                <i className="fa-solid fa-upload"></i>
                <span>Nhấn để tải ảnh lên</span>
            </div>
            <input
                ref={inputRef}
                className={styles.currentInput}
                type="file"
                accept="image/*"
                multiple={multiple}
                onChange={(e) => {
                    setFiles((files) => [
                        ...files,
                        ...Array.from(e.target.files!),
                    ]);
                }}
            />
        </div>
    );
};

export default FormUploadImage;
