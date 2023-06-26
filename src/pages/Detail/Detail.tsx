import { createContext, useContext, useState } from "react";
import { CardType } from "../../types/card.type";
import styles from "./Detail.module.scss";
import { useParams } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
interface DetailProps {}

const DetailContext = createContext<{
    card?: CardType;
}>({});

const Buttons = () => {
    return (
        <div className={styles.buttonsContent}>
            <div className={styles.buttonContent}>
                <Button type="primary-brightness">
                    <i className="fa-solid fa-share-nodes"></i>
                    <span>Chia sẻ</span>
                </Button>
            </div>
            <div className={styles.buttonContent}>
                <Button type="primary-brightness">
                    <i className="fa-solid fa-phone"></i>
                    <span>Gọi điện</span>
                </Button>
            </div>
            <div className={styles.buttonContent}>
                <Button type="primary-brightness">
                    <i className="fa-solid fa-envelope"></i>
                    <span>Gửi mail</span>
                </Button>
            </div>
        </div>
    );
};

const SliderImage = () => {
    const { card } = useContext(DetailContext);
    if (!card) return <></>;
    const [currentImage, setCurrentImage] = useState(0);
    const handlerNext = () => {
        if (currentImage === card?.images.length - 1) {
            setCurrentImage(0);
        } else {
            setCurrentImage(currentImage + 1);
        }
    };

    const handlerPrev = () => {
        if (currentImage === 0) {
            setCurrentImage(card?.images.length - 1);
        } else {
            setCurrentImage(currentImage - 1);
        }
    };

    return (
        <div className={styles.slider}>
            <div
                className={styles.sliderImages}
                style={{
                    width: `${card?.images.length * 100}%`,
                    transform: `translateX(-${
                        currentImage * (100 / card?.images.length)
                    }%)`,
                }}
            >
                {card?.images.map((image, index) => {
                    return (
                        <div className={styles.image} key={index}>
                            <img src={image} alt={image} />
                        </div>
                    );
                })}
            </div>
            {currentImage !== 0 && (
                <div
                    className={`${styles.button} ${styles.buttonPrev}`}
                    onClick={handlerPrev}
                >
                    <i className="fas fa-chevron-left"></i>
                </div>
            )}
            {currentImage !== card?.images.length - 1 && (
                <div
                    className={`${styles.button} ${styles.buttonNext}`}
                    onClick={handlerNext}
                >
                    <i className="fas fa-chevron-right"></i>
                </div>
            )}
            <div className={styles.content}>
                <div className="wrapper">
                    <div className={styles.box}>
                        <div className={styles.title}>{card?.title}</div>
                        <Buttons />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Description = () => {
    const { card } = useContext(DetailContext);
    return (
        <div className={styles.description}>
            <div className={styles.icon}>
                <i className="fas fa-info-circle"></i>
                <span>Chi tiết</span>
            </div>
            <div className={styles.text}>
                <p>{card?.description}</p>
            </div>
        </div>
    );
};

const Detail: React.FC<DetailProps> = () => {
    const { id } = useParams<{ id: string }>();
    const card = useSelector((state: RootState) => state.produce.cards).find(
        (card) => card.id === id,
    );

    const cardSuggestions = useSelector(
        (state: RootState) => state.produce.cards,
    ).slice(0, 6).filter(card => card.id !== id);

    return (
        <DetailContext.Provider value={{ card }}>
            <div className={styles.detail}>
                <SliderImage />
                <div className={styles.content}>
                    <div className={styles.head}>
                        <div className="wrapper">
                            <div className={styles.title}>{card?.title}</div>
                            <p className={styles.location}>
                                <i className="fas fa-map-marker-alt"></i>
                                <span
                                    style={{
                                        marginLeft: "0.5rem",
                                    }}
                                >
                                    {card?.location}
                                </span>
                            </p>

                            <Buttons />
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className="wrapper">
                            <Description />
                            <div className={styles.suggest}>
                                <h1>Một số gợi ý cho bạn</h1>
                                {cardSuggestions.map((card) => {
                                    return (
                                        <div className={styles.item}>
                                            <Card data={card} to={"/detail/" + card.id} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DetailContext.Provider>
    );
};

export default Detail;
