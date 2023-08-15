import { useSelector } from "react-redux";
import styles from './aboutPage.module.scss'
import { useFetchAboutQuery } from "@/src/store/reducers/apiSlice";
import { getAppLanguage } from "@/src/store/selectors/appSelectors";
import { Container } from "@/src/components/shared/container";
import { Loading } from "@/src/components/common/loading/loading";
import { ErrorHandler } from "@/src/components/common/error/errorHandler";
import AboutCard from "@/src/components/features/aboutCard/aboutCard";
export default function AboutPage() {
    const { data, error, isError, isLoading } = useFetchAboutQuery({ language: useSelector(getAppLanguage) })
    return (
        <Container>
            <div className={styles["about--container"]}>
                {isLoading && <Loading />}
                {isError && <ErrorHandler error={error} />}
                {data && data.map(({ title, desc, path }) => <AboutCard key={title} title={title} desc={desc} file_path={path} />)}
            </div>
        </Container>
    )
};
