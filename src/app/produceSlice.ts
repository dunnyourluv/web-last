import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CardType } from "../types/card.type";
import { lostItems } from "./data";

interface initialStateType {
    cards: CardType[];
    upload: {
        loading: boolean;
        error: string | null;
        success: string | null;
    };
    types: {
        value: string;
        label: string;
    }[];
}

const initialState: initialStateType = {
    types: [
        {
            value: "none",
            label: "Tất cả",
        },
        {
            value: "GT",
            label: "Giấy tờ",
        },
        {
            label: "Túi xách, ba lô",
            value: "TB",
        },
        {
            label: "Thiết bị điện tử",
            value: "TBDT",
        },
        {
            label: "Chìa khoá",
            value: "CK",
        },
    ],
    cards: lostItems,

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
