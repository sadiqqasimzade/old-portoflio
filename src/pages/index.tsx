import { useSelector } from "react-redux";
import styles from './welcomePage.module.scss'
import { useFetchLayoutQuery } from "@/src/store/reducers/apiSlice";
import { getAppLanguage } from "@/src/store/selectors/appSelectors";
import { Container } from "@/src/components/shared/container";
import { Loading } from "@/src/components/common/loading/loading";
import { ErrorHandler } from "@/src/components/common/error/errorHandler";
export default function Home() {
    const { error, isLoading, data, isError } = useFetchLayoutQuery({ language: useSelector(getAppLanguage) })
    return (
            <Container>
                {isLoading && <Loading />}
                {isError && <ErrorHandler error={error} />}
                {data && (
                    <div className={styles["welcome-page"]}>
                        <div className={styles["welcome-page-text"]}>
                            <h1 className="fs-5 text-center text-shadow">
                                {data.welcome_text.split("...")[0]}{" "}
                                <span className="fw-bold highlighted">Sadiq</span>
                                <br /> {data.welcome_text.split("...")[1]}
                            </h1>
                        </div>
                        <div className={styles["welcome-page-img"]} style={{ backgroundImage: `url(images/me.webp)` }}></div>
                    </div>
                )}
            </Container>
    );
}
