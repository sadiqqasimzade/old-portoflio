import styles from './contactPage.module.scss'
import { useSelector } from "react-redux";
import { useFetchLayoutQuery, useFetchSocialQuery } from "@/src/store/reducers/apiSlice";
import { getAppLanguage } from "@/src/store/selectors/appSelectors";
import { Container } from '@/src/components/shared/container';
import { Loading } from '@/src/components/common/loading/loading';
import { ErrorHandler } from '@/src/components/common/error/errorHandler';
import ContactForm from '@/src/components/features/contactForm/contactForm';


export default function ContactPage() {
    const { data: layoutData, error: layoutError, isError: layoutIsError, isLoading: layoutIsLoading } = useFetchLayoutQuery({ language: useSelector(getAppLanguage) })
    const { data: socialData, error: socialError, isError: socialIsError, isLoading: socialIsLoading } = useFetchSocialQuery()

    return (
        <Container>
            <div className={styles["contact-form"]}>
                <div className={styles["contact-body"]}>
                    <div className={styles["contact-about"]}>
                        <div className={styles["contact-title-container"]+ " p-2 text-shadow"}>
                            <p className={styles["contact-title"]}>
                                {layoutIsLoading && <Loading />}
                                {layoutIsError && <ErrorHandler error={layoutError} />}
                                {layoutData?.contact_me}
                            </p>
                        </div>
                        <div className={styles["contact-social-container"] + " text-shadow"}>
                            {socialIsLoading && <Loading />}
                            {socialIsError && <ErrorHandler error={socialError} />}
                            {socialData &&
                                socialData.map(({ href, svg }) => (
                                    <a href={href} key={href}>
                                        <img
                                        src={`${svg}`}
                                            alt={svg}
                                            className={styles["contact-social"]+ " " + "white-filter"}
                                        />
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
