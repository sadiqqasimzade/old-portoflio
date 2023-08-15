import { ErrorHandler } from "src/presentation/components/common/error/error";
import { Loading } from "src/presentation/components/common/loading/loading";
import ContactForm from "src/presentation/components/features/contactForm/contactForm";
import { Container } from "src/presentation/components/shared/container";
import { useFetchLayoutQuery, useFetchSocialQuery } from "src/presentation/state/reducers/apiSlice";
import './contactPage.scss'
import { useSelector } from "react-redux";
import { getAppLanguage } from "src/presentation/state/selectors/appSelectors";
export default () => {
    const { data: layoutData, error: layoutError, isError: layoutIsError, isLoading: layoutIsLoading } = useFetchLayoutQuery({language:useSelector(getAppLanguage)})
    const { data: socialData, error: socialError, isError: socialIsError, isLoading: socialIsLoading } = useFetchSocialQuery()
    return (
        <Container>
            <div className="contact-form">
                <div className="contact-body">
                    <div className="contact-about">
                        <div className="contact-title-container p-2 text-shadow">
                            <p className="contact-title">
                                {layoutIsLoading && <Loading />}
                                {layoutIsError && <ErrorHandler error={layoutError} />}
                                {layoutData?.contact_me}
                            </p>
                        </div>
                        <div className="contact-social-container text-shadow">
                            {socialIsLoading && <Loading />}
                            {socialIsError && <ErrorHandler error={socialError} />}
                            {socialData &&
                                socialData.map(({ href, svg }) => (
                                    <a href={href}>
                                        <img
                                            src={`images/${svg}`}
                                            alt={svg}
                                            className="contact-social white-filter"
                                        ></img>
                                    </a>
                                ))}
                        </div>
                    </div>
                    <ContactForm />
                </div>
            </div>
        </Container >
    )
};
