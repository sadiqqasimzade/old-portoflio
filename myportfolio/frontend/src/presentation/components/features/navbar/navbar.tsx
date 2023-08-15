import { Link } from "react-router-dom";
import { useFetchNavQuery } from "src/presentation/state/reducers/apiSlice";
import { Loading } from "../../common/loading/loading";
import { ErrorHandler } from "../../common/error/error";
import "./navbar.scss";
import { useSelector } from "react-redux";
import { getAppLanguage, getAppPath } from "src/presentation/state/selectors/appSelectors";

export const Navbar = () => {
    const { data, isError, isLoading, error } = useFetchNavQuery({ language: useSelector(getAppLanguage) })
    const currentPath = useSelector(getAppPath)
    return (
        <header className="flex-centered">
            <nav className="navbar">
                <ul>
                    {isLoading && <Loading />}
                    {isError && <ErrorHandler error={error} />}
                    {data &&
                        data.map(({ title, href, file_path }) => (
                            <li key={href} className={currentPath === href ? 'navbar-active' : ''}>
                                <Link to={href}>
                                    <div className="navbar-icon-holder">
                                        <img
                                            src={`images/${file_path}`}
                                            className="navbar-icon"
                                            alt="navelement"
                                        ></img>
                                    </div>
                                    <span className="navbar-text">{title}</span>
                                </Link>
                            </li>
                        ))}
                </ul>
            </nav>
        </header>
    );
}
