import { useState } from "react";
import { CardType } from "../../../types/card.type";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";

const SliderImages: React.FC<{ images: string[] }> = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const handlerPrev = () => {
        if (currentImage === 0) {
            setCurrentImage(images.length - 1);
        } else {
            setCurrentImage(currentImage - 1);
        }
    };

    const handlerNext = () => {
        if (currentImage === images.length - 1) {
            setCurrentImage(0);
        } else {
            setCurrentImage(currentImage + 1);
        }
    };

    return (
        <div className={styles.slider}>
            <div
                className={styles.sliderImages}
                style={{
                    width: `${images.length * 100}%`,
                    transform: `translateX(-${
                        currentImage * (100 / images.length)
                    }%)`,
                }}
            >
                {images.map((image, index) => (
                    <div className={styles.image} key={index}>
                        <img src={image} alt={image} />
                    </div>
                ))}
            </div>
            {currentImage !== 0 && (
                <div
                    className={`${styles.button} ${styles.buttonPrev}`}
                    onClick={handlerPrev}
                >
                    <i className="fas fa-chevron-left"></i>
                </div>
            )}
            {currentImage !== images.length - 1 && (
                <div
                    className={`${styles.button} ${styles.buttonNext}`}
                    onClick={handlerNext}
                >
                    <i className="fas fa-chevron-right"></i>
                </div>
            )}
        </div>
    );
};

interface CardProps {
    data: CardType;
    to?: string;
}

const Card: React.FC<CardProps> = ({ data, to }) => {
    const Comp = to ? Link : "div";
    return (
        <div className={styles.card}>
            <div className={styles.tagName}>
                <span>{data.user.name}</span>
            </div>
            {data.images.length > 0 ? (
                <SliderImages images={data.images} />
            ) : (
                <div className={styles.overlayImage}></div>
            )}
            <Comp
                to={to || ""}
                className={styles.info}
                style={{
                    cursor: to ? "pointer" : "default",
                }}
            >
                <div className={styles.title}>
                    <span>{data.title}</span>
                </div>
                <div className={styles.description}>
                    <span>
                        {data.description.length > 50
                            ? data.description.slice(0, 50) + "..."
                            : data.description}
                    </span>
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.phone}>
                        <i className="fas fa-phone-alt"></i>
                        <span>{data.user.phone}</span>
                    </div>
                    <div className={styles.location}>
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{data.location}</span>
                    </div>
                </div>
            </Comp>
        </div>
    );
};

export default Card;
