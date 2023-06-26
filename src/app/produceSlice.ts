import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CardType } from "../types/card.type";

interface initialStateType {
    cards: CardType[];
    upload: {
        loading: boolean;
        error: string | null;
        success: string | null;
    };
}

const initialState: initialStateType = {
    cards: [
        {
            id: "1",
            user: {
                id: "1",
                email: "lethedung@gmail.com",
                name: "Lê Thế Dũng",
                password: "123123123",
                phone: "1234567890",
            },
            description: "Tôi đánh mất chìa khoá ở đâu đó",
            title: "TÌm chìa khoá",
            images: [
                "https://cdn.tgdd.vn/Files/2020/08/25/1283726/xx-meo-giup-ban-khong-quen-that-lac-chia-khoa-13.jpg",
                "https://suakhoataihanoi.com/wp-content/uploads/2019/08/%C4%91%C3%A1nh-kh%C3%B3a.jpg",
            ],
            location: "Hà Nội",
            type: "none",
        },
        {
            id: "2",
            user: {
                id: "1",
                email: "lethedung@gmail.com",
                name: "Thuỳ Dương",
                password: "123123123",
                phone: "1234567890",
            },
            title: "TÌm balo",
            description:
                "Tôi để quên balo của mình tại công viên, ai nhặt được xin liên hệ với tôi qua số điện thoại 0123456789",
            images: [
                "https://bizweb.dktcdn.net/thumb/1024x1024/100/462/540/products/teal-78d518cc-ff30-4e54-91a7-6089b90ce9e3.jpg",
                "https://cf.shopee.vn/file/9fbddeaf66b8e9a2d49bcc36a516c0dd",
            ],
            location: "Đà Nẵng",
            type: "none",
        },
        {
            id: "3",
            user: {
                id: "1",
                email: "lethedung@gmail.com",
                name: "Thuỳ Dương",
                password: "123123123",
                phone: "1234567890",
            },
            title: "TÌm điện thoại di động",
            description:
                "Tôi đánh rơi điện thoại di động của tôi ở công viên. Ai nhặt được liên hệ...",
            images: [
                "https://images2.thanhnien.vn/Uploaded/tamkc/2022_04_12/47cb7a75-7dd8-45e5-b0be-989eedf68d4c-4196.jpeg",
                "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//News/1509677//dien-thoai-apple-iphone-6-800x450-2.jpg",
            ],
            location: "Đà Nẵng",
            type: "none",
        },
    ],

    upload: {
        loading: false,
        error: null,
        success: null,
    },
};

export const produceSlice = createSlice({
    name: "produce",
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<CardType>) => {
            state.cards.push(action.payload);
        },
        addCardSuccess: (state, action: PayloadAction<string>) => {
            state.upload.loading = false;
            state.upload.error = null;
            state.upload.success = action.payload;
        },
        addCardFailure: (state, action: PayloadAction<string>) => {
            state.upload.loading = false;
            state.upload.error = action.payload;
        },
    },
});

export const { addCard, addCardFailure, addCardSuccess } = produceSlice.actions;
export default produceSlice.reducer;
