import { Loading } from "../../common/loading/loading";
import { ErrorHandler } from "../../common/error/errorHandler";
import styles from "./navbar.module.scss";
import { useSelector } from "react-redux";
import { useFetchNavQuery } from "@/src/store/reducers/apiSlice";
import { getAppLanguage } from "@/src/store/selectors/appSelectors";
import Link from "next/link";
import { useRouter } from "next/router";
export const Navbar = () => {
    const { data, isError, isLoading, error } = useFetchNavQuery({ language: useSelector(getAppLanguage) })
    const currentPath =useRouter().asPath
    return (
        <header className={styles["header"] +" flex-centered"}>
            <nav className={styles["navbar"]}>
                <ul>
                    {isLoading && <Loading />}
                    {isError && <ErrorHandler error={error} />}
                    {data &&
                        data.map(({ title, href, file_path }) => (
                            <li key={href} className={currentPath === href ? styles['navbar-active'] : ''}>
                                <Link href={href}>
                                    <div className={styles["navbar-icon-holder"]}>
                                        <img
                                            width={24}
                                            height={24}
                                            src={`${file_path}`}
                                            className={styles["navbar-icon"]}
                                            alt="navelement" />
                                    </div>
                                    <span className={styles["navbar-text"]}>{title}</span>
                                </Link>
                            </li>
                        ))}
                </ul>
            </nav>
        </header>
    );
}
