import { Container } from "src/presentation/components/shared/container";
import { useFetchAboutQuery } from "src/presentation/state/reducers/apiSlice";
import { Loading } from "src/presentation/components/common/loading/loading";
import { ErrorHandler } from "src/presentation/components/common/error/error";
import AboutCard from "src/presentation/components/features/aboutCard/aboutCard";
import { useSelector } from "react-redux";
import { getAppLanguage } from "src/presentation/state/selectors/appSelectors";
import './aboutPage.scss'
export default () => {
    const { data, error, isError, isLoading } = useFetchAboutQuery({ language: useSelector(getAppLanguage) })
    return (
        <Container>
            <div className="about--container">
                {isLoading && <Loading />}
                {isError && <ErrorHandler error={error} />}
                {data && data.map(({ title, desc, path }) => <AboutCard title={title} desc={desc} file_path={path} />)}
            </div>
        </Container>
    )
};
