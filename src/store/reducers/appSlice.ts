import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type Languages = 'en' | 'ru' | 'az'
type AppState = {
    language: Languages
    isActiveModal: boolean
    modalContent: React.ReactNode|null
    portfolioQuery: string[]
}
const initialState: AppState = {
    language: 'en',
    isActiveModal: false,
    modalContent: null,
    portfolioQuery: []
}


const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeLanguage(state, action: PayloadAction<Languages>) {
            state.language = action.payload
        },
        changeModalState(state, action: PayloadAction<boolean>) {
            state.isActiveModal = action.payload
        },
        changeModalContent(state, action: PayloadAction<React.ReactNode>) {
            state.modalContent = action.payload
        },
        changePortfolioQuery(state, action: PayloadAction<string[]>) {
            state.portfolioQuery = action.payload
        }
    }
})

export const { changeLanguage,changeModalContent,changeModalState,changePortfolioQuery } = appSlice.actions
export default appSlice.reducer