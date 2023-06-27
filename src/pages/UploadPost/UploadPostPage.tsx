import { useDispatch, useSelector } from "react-redux";
import UploadPost from "../../features/UploadPost/UploadPost";
import styles from "./UploadPostPage.module.scss";
import { addCard, addCardSuccess } from "../../app/produceSlice";
import { v4 } from "uuid";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

interface UploadPostPageProps {}

const UploadPostPage: React.FC<UploadPostPageProps> = () => {
    useTitle("Upload")
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (!user) throw new Error("User is not defined");
    return (
        <div className={styles.uploadPost}>
            <div className="wrapper">
                <div className={styles.uploadForm}>
                    <UploadPost
                        onUploadPost={(data) => {
                            let id = v4();
                            dispatch(
                                addCard({
                                    id: id,
                                    description: data.description,
                                    location: data.location,
                                    title: data.title,
                                    images: data.images.map((img) =>
                                        URL.createObjectURL(img),
                                    ),
                                    type: data.type as
                                        | "none"
                                        | "VB"
                                        | "GT"
                                        | "CMND"
                                        | "TSV",
                                    user: user,
                                }),
                            );
                            dispatch(addCardSuccess("Đăng tin thành công!"));
                            navigate("/detail/" + id);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default UploadPostPage;
