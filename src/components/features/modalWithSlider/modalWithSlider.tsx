import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ErrorHandler } from "../../common/error/errorHandler"
import { Loading } from "../../common/loading/loading"
import Slider from "../slider/slider"
import { getAppLanguage, getPortfolioQuery } from "@/src/store/selectors/appSelectors"
import { useFetchLayoutQuery, useFetchTechnologyQuery } from "@/src/store/reducers/apiSlice"
import { changePortfolioQuery } from "@/src/store/reducers/appSlice"
import styles from "../../shared/modal/modal.module.scss"
export default function ModalWithSlider() {
    //getting data
    const language = useSelector(getAppLanguage)
    const searchQuery = useSelector(getPortfolioQuery)
    const { data: technologyData, error: technologyError, isLoading: technologyIsLoading, isError: technologyIsError } = useFetchTechnologyQuery({ language: useSelector(getAppLanguage) })
    const { data: layoutData, error: layoutError, isLoading: layoutIsLoading, isError: layoutIsError } = useFetchLayoutQuery({ language: language })
    const dispatch = useDispatch()
    //tag-click
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const eventTarget = e.target as HTMLDivElement & { attributes: any };
        if (eventTarget.attributes['data-status'].value === "exclude") {
            eventTarget.attributes['data-status'].value = "include";
            dispatch(changePortfolioQuery([...searchQuery, eventTarget.innerText]))
        } else {
            eventTarget.attributes['data-status'].value = "exclude";
            dispatch(changePortfolioQuery(searchQuery.filter(tag => tag !== eventTarget.innerText)))
        }
    }, [searchQuery]);
    return (
        layoutIsLoading ? <Loading /> : layoutIsError ? <ErrorHandler error={layoutError} /> :
            <div className={styles["modal-grid"]}>
                <div className={styles["modal-content"]}>
                    <div className={styles["modal-tag-container"]}>
                        <p className={styles["modal-tag-container-title"]}>{layoutData?.all_technologies}</p>
                        <br></br>
                        {technologyIsLoading ? <Loading /> : technologyIsError ? <ErrorHandler error={technologyError} /> :
                            technologyData?.filter(technology => !searchQuery.includes(technology.name)).map(({ name, help_text, file_path }) => (
                                <div
                                    key={name}
                                    className={styles["modal-tag"]}
                                    data-status="exclude"
                                    onClick={handleClick}
                                    help-text={help_text}
                                >
                                    <div
                                        className={styles["modal-tag-img"]}
                                        style={{ backgroundImage: `url(${file_path})` }}
                                    ></div>
                                    {name}
                                </div>
                            ))}
                    </div>
                    <hr></hr>
                    <div className={styles["modal-tag-container"]}>
                        <p className={styles["modal-tag-container-title"]}>{layoutData?.selected_technologies}</p>
                        {technologyIsLoading ? <Loading /> : technologyIsError ? <ErrorHandler error={technologyError} /> :
                            technologyData?.filter(technology => searchQuery.includes(technology.name)).map(({ name, help_text, file_path }) => (
                                <div
                                    key={name}
                                    className={styles["modal-tag"]}
                                    data-status="include"
                                    onClick={handleClick}
                                    help-text={help_text}
                                >
                                    <div
                                        className={styles["modal-tag-img"]}
                                        style={{ backgroundImage: `url(${file_path})` }}
                                    ></div>
                                    {name}
                                </div>
                            ))}
                    </div>
                    <hr></hr>
                </div>
                <Slider />
            </div>

    )
}