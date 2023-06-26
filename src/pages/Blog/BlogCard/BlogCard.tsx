import { Link } from "react-router-dom";
import { BlogItem } from "../../../types/blog.type";
import styles from "./BlogCard.module.scss";

interface BlogCardProps {
    data: BlogItem;
}

const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
    return (
        <div className={styles.blogCard}>
            <div
                className={styles.image}
                style={{
                    backgroundImage: `url(${data.background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "22rem",
                }}
            >
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.content}>
                <Link to={`/blog/${data.id}`} className={styles.title}>
                    {data.title}
                </Link>
                <div className={styles.description}>{data.description}</div>
            </div>
            <div className={styles.tag}>
                <div className={styles.icon}>
                    <i className="fas fa-tag"></i>
                </div>
                <div className={styles.name}>{data.tag}</div>
            </div>
        </div>
    );
};

export default BlogCard;
