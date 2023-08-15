import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { getAppPath } from "../state/selectors/appSelectors"
import { useDispatch, useSelector } from "react-redux"
import { changeCurrentPath } from "../state/reducers/appSlice"
import AboutPage from "../pages/aboutPage/aboutPage"
import ContactPage from "../pages/contactPage/contactPage"
import PortfolioPage from "../pages/portfolioPage/portfolioPage"
import WelcomePage from "../pages/welcomePage/welcomePage"
import NotFound from "../pages/notFound/notFound"


export default () => {
    const [transitionStage, setTransitionStage] = useState<'fadeIn' | 'fadeOut'>('fadeOut')
    const location = useLocation();
    const displayLocation = useSelector(getAppPath)
    const dispatch = useDispatch()
    useEffect(() => {
        if (location.pathname !== displayLocation)
            setTransitionStage("fadeOut");
    }, [location, displayLocation]);
    return (

        <div className={transitionStage+" overflow-hidden"} onAnimationEnd={() => {
            if (transitionStage === "fadeOut") {
                setTransitionStage("fadeIn");
                dispatch(changeCurrentPath(location.pathname))
            }
        }} style={{ willChange: "transform" }}>
                <Routes location={displayLocation}>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
        </div>
    )
}