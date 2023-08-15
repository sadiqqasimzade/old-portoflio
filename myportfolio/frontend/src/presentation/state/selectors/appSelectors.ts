import { RootState } from "../reducers/rootReducer";

export const getAppLanguage = (state: RootState) => state.appSlice.language
export const getAppPath = (state: RootState) => state.appSlice.currentPath
export const getModalState = (state: RootState) => state.appSlice.isActiveModal
export const getModalContent = (state: RootState) => state.appSlice.modalContent
export const getPortfolioQuery = (state: RootState) => state.appSlice.portfolioQuery