import { memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './languageSelector.module.scss'
import { changeLanguage } from "@/src/store/reducers/appSlice";
import { getAppLanguage } from "@/src/store/selectors/appSelectors";


export const LanguageSelector = memo(() => {
    const language = useSelector(getAppLanguage)
    const dispatch = useDispatch()
    const circular_menu = useRef<HTMLDivElement>(null)

    return (
        <div className={styles["circular-menu"]} ref={circular_menu}>
            <p className={styles["circular-menu-btn"]}
                onClick={() => {
                    const cm = circular_menu.current as HTMLDivElement;
                    if (cm.classList.contains(styles["active"])) {
                        cm.classList.remove(styles["active"]);
                    } else {
                        cm.classList.add(styles["active"]);
                    }
                }}>
                <img
                    alt="menu"
                    className="white-filter"
                    src="/images/globe.svg"
                    width={24}
                    height={24}
                />
            </p>
            <div>
                {language !== 'az' && (
                    <p
                        style={{ backgroundImage: 'url("images/az.svg")' }}
                        className={styles["circular-menu-item"]}
                        onClick={() => {
                            dispatch(changeLanguage('az'))
                            const cm = circular_menu.current as HTMLDivElement;
                            cm.classList.remove(styles["active"]);
                        }}
                    ></p>
                )}
                {language !== 'ru' && (
                    <p
                        style={{ backgroundImage: 'url("images/ru.svg")' }}
                        className={styles["circular-menu-item"]}
                        onClick={() => {
                            dispatch(changeLanguage('ru'))
                            const cm = circular_menu.current as HTMLDivElement;
                            cm.classList.remove(styles["active"]);
                        }}
                    ></p>
                )}

                {language !== 'en' && (
                    <p
                        style={{ backgroundImage: 'url("images/en.svg")' }}
                        className={styles[`circular-menu-item`]}
                        onClick={() => {
                            dispatch(changeLanguage('en'))
                            const cm = circular_menu.current as HTMLDivElement;
                            cm.classList.remove(styles["active"]);
                        }}
                    ></p>
                )}
            </div>
        </div>
    );
});
