import { memo, useMemo, useState } from "react";
// import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./slider.scss";
import { useSelector } from "react-redux";
import { useFetchLayoutQuery, useFetchProjectQuery } from "src/presentation/state/reducers/apiSlice";
import { getAppLanguage, getPortfolioQuery } from "src/presentation/state/selectors/appSelectors";
import { ProjectDataType } from "src/presentation/state/types/projectType";
import { ErrorHandler } from "../../common/error/error";
import { Loading } from "../../common/loading/loading";
import './slider.scss'
export default memo(() => {
    const language = useSelector(getAppLanguage)
    const searchQuery = useSelector(getPortfolioQuery)
    const { data: layoutData, error: layoutError, isLoading: layoutIsLoading, isError: layoutIsError } = useFetchLayoutQuery({ language: language })
    const { data: projectData } = useFetchProjectQuery({ language: language })
    //sort projects
    const [sortedProjects, setSortedProjects] = useState<ProjectDataType[]>([]);
    useMemo(() => {
        if (projectData) {
            if (searchQuery.length === 0) {
                setSortedProjects(projectData);
            } else {
                let result: ProjectDataType[] = [];
                searchQuery.forEach((tag) => {
                    result = result.concat(projectData
                        .filter((project) => project.technologies.findIndex((technolgy) => technolgy.name === tag) !== -1)
                        .filter((item) => result.indexOf(item) < 0)
                    );
                });
                result.length === 0 ? setSortedProjects([]) : setSortedProjects(result);
            }
        }
    }, [searchQuery, projectData]);


    const [app, updateApp] = useState<{ currentIndex: number, lastIndex: number, direction: number }>({
        currentIndex: 0,
        lastIndex: -1,
        direction: 1,
    });
    //controls
    function showNext(index: number) {
        if (sortedProjects.length !== 0) {
            const lastIndex =
                index < 0 ? 0 : index === sortedProjects.length ? sortedProjects.length - 1 : index;
            const currentIndex = index + 1 === sortedProjects.length ? 0 : index + 1;
            updateApp({ currentIndex, lastIndex, direction: 1 });
        }
    }
    function showPrevious(index: number) {
        if (sortedProjects.length !== 0) {
            const lastIndex = index < 0 ? 0 : index;
            const currentIndex = index - 1 < 0 ? sortedProjects.length - 1 : index - 1;
            updateApp({ currentIndex, lastIndex, direction: -1 });
        }
    }
    return (
        <div className="carousel-container">
            <div className="carousel">
                <span
                    onClick={() => showPrevious(app.currentIndex)}
                    className={"controls controls-prev"}
                >
                    <img
                        src="images/left.svg"
                        alt="control-left"
                        className={"white-filter"}
                    ></img>
                </span>
                <div className="slide">
                    {/*slide-transition-l.out-in*/}
                    {layoutIsLoading ? <Loading /> : layoutIsError ? <ErrorHandler error={layoutError} /> :
                        layoutData && (sortedProjects.length !== 0 ?
                            <a href={sortedProjects[app.currentIndex].link}
                                className={`card ${app.direction === 1 ? 'slide-transition-l' : 'slide-transition-r'}`}
                                style={{
                                    backgroundImage: `url(images/${sortedProjects[app.currentIndex].image})`,
                                }}>
                                <div className="card-footer">
                                    <div className="card-info">
                                        <div className="card-technologies">
                                            {sortedProjects[app.currentIndex].technologies.map(
                                                ({ name, img }, index) => (
                                                    <div
                                                        style={{
                                                            '--t-delay': 1 + index * 0.3 + 's',
                                                            backgroundImage: `url(images/${img})`,
                                                        }}
                                                        className="card-technology"
                                                    ></div>
                                                )
                                            )}
                                        </div>
                                        <h2 className="card-title">
                                            {sortedProjects[app.currentIndex].title}
                                        </h2>
                                        <h2 className="card-desc">
                                            {sortedProjects[app.currentIndex].description}
                                        </h2>
                                    </div>
                                </div>
                            </a>
                            :
                            <p className="slide-notfound">
                                {layoutData.projects_notfound}
                            </p>)
                    }
                </div>

                <span onClick={() => showNext(app.currentIndex)}
                    className="controls controls-next">
                    <img
                        src="images/right.svg"
                        alt="contorl-right"
                        className="white-filter"
                    ></img>
                </span>
            </div>
        </div >
    );
});
