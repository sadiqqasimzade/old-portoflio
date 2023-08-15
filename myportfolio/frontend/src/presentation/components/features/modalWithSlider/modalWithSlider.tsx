import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFetchTechnologyQuery, useFetchLayoutQuery } from "src/presentation/state/reducers/apiSlice"
import { changePortfolioQuery } from "src/presentation/state/reducers/appSlice"
import { getAppLanguage, getPortfolioQuery } from "src/presentation/state/selectors/appSelectors"
import { ErrorHandler } from "../../common/error/error"
import { Loading } from "../../common/loading/loading"
import Slider from "../slider/slider"

export default () => {
    //getting data
    const language = useSelector(getAppLanguage)
    const searchQuery = useSelector(getPortfolioQuery)
    const { data: technologyData, error: technologyError, isLoading: technologyIsLoading, isError: technologyIsError } = useFetchTechnologyQuery({language:useSelector(getAppLanguage)})
    const { data: layoutData, error: layoutError, isLoading: layoutIsLoading, isError: layoutIsError } = useFetchLayoutQuery({ language: language })
    const dispatch = useDispatch()
    //tag-click
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target.attributes['data-status'].value === "exclude") {
            e.target.attributes['data-status'].value = "include";
            dispatch(changePortfolioQuery([...searchQuery, e.target.innerText]))
        } else {
            e.target.attributes['data-status'].value = "exclude";
            dispatch(changePortfolioQuery(searchQuery.filter(tag => tag !== e.target.innerText)))
        }
    }, [searchQuery]);
    return (
        layoutIsLoading ? <Loading /> : layoutIsError ? <ErrorHandler error={layoutError} /> :
            <div className="modal-grid">
                <div className="modal-content">
                    <div className="modal-tag-container">
                        <p className="modal-tag-container-title">{layoutData?.all_technologies}</p>
                        <br></br>
                        {technologyIsLoading ? <Loading /> : technologyIsError ? <ErrorHandler error={technologyError} /> :
                            technologyData?.filter(technology => !searchQuery.includes(technology.name)).map(({ name, help_text, file_path }) => (
                                <div
                                    key={name}
                                    className="modal-tag"
                                    data-status="exclude"
                                    onClick={handleClick}
                                    help-text={help_text}
                                >
                                    <div
                                        className="modal-tag-img"
                                        style={{ backgroundImage: `url(images/${file_path})` }}
                                    ></div>
                                    {name}
                                </div>
                            ))}
                    </div>
                    <hr></hr>
                    <div className="modal-tag-container">
                        <p className="modal-tag-container-title">{layoutData?.selected_technologies}</p>
                        {technologyIsLoading ? <Loading /> : technologyIsError ? <ErrorHandler error={technologyError} /> :
                            technologyData?.filter(technology => searchQuery.includes(technology.name)).map(({ name, help_text, file_path }) => (
                                <div
                                    key={name}
                                    className="modal-tag"
                                    data-status="include"
                                    onClick={handleClick}
                                    help-text={help_text}
                                >
                                    <div
                                        className="modal-tag-img"
                                        style={{ backgroundImage: `url(images/${file_path})` }}
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