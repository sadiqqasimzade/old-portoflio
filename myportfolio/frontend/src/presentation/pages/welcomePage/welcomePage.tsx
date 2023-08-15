import { useFetchLayoutQuery } from "src/presentation/state/reducers/apiSlice";
import { Loading } from "src/presentation/components/common/loading/loading";
import { ErrorHandler } from "src/presentation/components/common/error/error";
import { Container } from "src/presentation/components/shared/container";
import "./welcomePage.scss"
import { useSelector } from "react-redux";
import { getAppLanguage } from "src/presentation/state/selectors/appSelectors";
export default function WelcomePage() {
    const { error, isLoading, data, isError } = useFetchLayoutQuery({ language: useSelector(getAppLanguage) })
    return (
        <Container>
            <Container>
            {isLoading && <Loading />}
            {isError && <ErrorHandler error={error} />}
            {data && (
                <div className="welcome-page">
                    <div className="welcome-page-text">
                        <h1 className="fs-5 text-center text-shadow">
                            {data.welcome_text.split("...")[0]}{" "}
                            <span className="fw-bold highlighted">Sadiq</span>
                            <br /> {data.welcome_text.split("...")[1]}
                        </h1>
                    </div>
                    <div className="welcome-page-img" style={{ backgroundImage: `url(images/me.webp)` }}></div>
                </div>
            )}
            </Container>
        </Container>
    );
}
