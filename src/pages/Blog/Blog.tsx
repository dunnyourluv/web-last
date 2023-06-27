import useTitle from "../../hooks/useTitle";
import styles from "./Blog.module.scss";
import BlogCard from "./BlogCard/BlogCard";

interface BlogProps {}

const data = {
    id: "1",
    title: "Getting Started with JavaScript",
    content: "JavaScript is a powerful programming language...",
    background:
        "https://images.pexels.com/photos/2096700/pexels-photo-2096700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imagesInContent: ["image1.jpg", "image2.jpg"],
    description:
        "Learn the basics of JavaScript and start building interactive websites.",
    tag: "JavaScript",
};

const Blog: React.FC<BlogProps> = ({}) => {
    useTitle("Blogs")
    return (
        <div className={styles.blog}>
            <div className="wrapper">
                <div className={styles.header}>
                    <h1 className={styles.title}>Blog</h1>
                </div>
                <div className={styles.blogList}>
                    <div className={styles.blogItem}>
                        <BlogCard
                            data={{
                                id: "1",
                                background:
                                    "https://d1j8r0kxyu9tj8.cloudfront.net/images/1565602133w6pZ3XLEwC275hw.jpg",
                                title: "Mẹo hay cho những người chuyên để thất lạc đồ",
                                description:
                                    "Đi làm mà để quên điện thoại ở nhà, hẳn cả ngày bạn sẽ bứt rứt không yên",
                                content: "",
                                imagesInContent: [],
                                tag: "Bí quyết tìm đồ thất lạc",
                            }}
                        />
                    </div>
                    <div className={styles.blogItem}>
                        <BlogCard
                            data={{
                                id: "2",
                                background:
                                    "https://img6.thuthuatphanmem.vn/uploads/2022/05/15/anh-chill-do-an-don-gian-ma-dep_015140302.jpg",
                                title: "Cách để phòng tránh bị thất lạc đồ",
                                description:
                                    "Chúng ta thường mất khá nhiều thời gian để tìm lại những đồ bị thất lạc chỉ vì không…",
                                content: "",
                                imagesInContent: [],
                                tag: "Bí quyết tìm đồ thất lạc",
                            }}
                        />
                    </div>
                    <div className={styles.blogItem}>
                        <BlogCard data={{
                                id: "3",
                                background:
                                    "https://pepsilan.com/wp-content/uploads/2022/04/PbKUg_AwlXal78pq1LWS7j-0KlZp5bc5IZAdBDKmlLg4eYAF0KIpbmNDvltZl82Wfg-qkPKt-Kyn3e2yuk9YtvxEk-fEOHDSubh2U_FCmheQ9kUqv4u6bThqlMEbAALkp4JxmScY.png",
                                title: "Cách tìm kiếm điện thoại thất lạc nhanh nhất",
                                description:
                                    "Cách tìm kiếm điện thoại bị mất của bạn, cho dù đó là Android, iPhone hay bất kỳ loại…",
                                content: "",
                                imagesInContent: [],
                                tag: "Bí quyết tìm đồ thất lạc",
                            }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
