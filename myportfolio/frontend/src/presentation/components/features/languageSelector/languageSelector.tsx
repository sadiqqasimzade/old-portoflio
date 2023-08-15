import { memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "src/presentation/state/reducers/appSlice";
import { getAppLanguage } from "src/presentation/state/selectors/appSelectors";
import './languageSelector.scss'
export const LanguageSelector = memo(() => {
    const language = useSelector(getAppLanguage)
    const dispatch = useDispatch()
    const circular_menu = useRef<HTMLDivElement>(null)

    return (
        <div className="circular-menu" ref={circular_menu}>
            <p className="circular-menu-btn"
                onClick={() => {
                    const cm = circular_menu.current as HTMLDivElement;
                    if (cm.classList.contains("active")) {
                        cm.classList.remove("active");
                    } else {
                        cm.classList.add("active");
                    }
                }}>
                <img
                    alt="menu"
                    className="white-filter"
                    src="/images/globe.svg"
                ></img>
            </p>
            <div>
                {language !== 'az' && (
                    <p
                        style={{ backgroundImage: 'url("images/az.svg")' }}
                        className="circular-menu-item"
                        onClick={(e) => {
                            dispatch(changeLanguage('az'))
                            const cm = circular_menu.current as HTMLDivElement;
                            cm.classList.remove("active");
                        }}
                    ></p>
                )}
                {language !== 'ru' && (
                    <p
                        style={{ backgroundImage: 'url("images/ru.svg")' }}
                        className={`circular-menu-item`}
                        onClick={(e) => {
                            dispatch(changeLanguage('ru'))
                            const cm = circular_menu.current as HTMLDivElement;
                            cm.classList.remove("active");
                        }}
                    ></p>
                )}

                {language !== 'en' && (
                    <p
                        style={{ backgroundImage: 'url("images/en.svg")' }}
                        className={`circular-menu-item`}
                        onClick={(e) => {
                            dispatch(changeLanguage('en'))
                            const cm = circular_menu.current as HTMLDivElement;
                            cm.classList.remove("active");
                        }}
                    ></p>
                )}
            </div>
        </div>
    );
});
