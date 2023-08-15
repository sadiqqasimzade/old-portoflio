import { FC } from "react";
import './globals.scss'
import { Provider } from "react-redux";
import store from "../store/reducers/rootReducer";
import { Navbar } from "../components/features/navbar/navbar";
import { LanguageSelector } from "../components/features/languageSelector/languageSelector";
import { ModalContainer } from "../components/shared/modal/modalContainer";
import PageTransition from "../components/shared/page_transition/pageTransition";

  
export default function MyApp({ Component, pageProps }: { Component: FC, pageProps: any }) {
    return (
        <>
            <Provider store={store}>
                <Navbar />
                <PageTransition>
                    <Component {...pageProps} />
                </PageTransition>
                <LanguageSelector />
                <ModalContainer />
            </Provider>
        </>
    )
}