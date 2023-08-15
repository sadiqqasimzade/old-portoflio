import { useFetchLayoutQuery } from "@/src/store/reducers/apiSlice";
import { getAppLanguage } from "@/src/store/selectors/appSelectors";
import { emailApis } from "@/src/constants/apis";
import { FormEvent, useRef } from "react";
import { useSelector } from "react-redux";
import { ErrorHandler } from "../../common/error/errorHandler";
import { Loading } from "../../common/loading/loading";
import styles from "../../../pages/contact/contactPage.module.scss"

export default function ContactForm() {
    const { data: layoutData, isLoading: layoutIsLoading, isError: layoutIsError, error: layoutError } = useFetchLayoutQuery({ language: useSelector(getAppLanguage) })
    const nameErrorRef = useRef<HTMLSpanElement>(null);
    const emailErrorRef = useRef<HTMLSpanElement>(null);
    const messageErrorRef = useRef<HTMLSpanElement>(null);
    const finalErrorRef = useRef<HTMLSpanElement>(null);
    const onsubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        finalErrorRef.current!.innerText = layoutData!.loading
        const data: { [key: string]: any } = {};
        const inputs = (e.target as HTMLFormElement).querySelectorAll("input,textarea");
        for (const input of inputs) {
            const elementWithName = input as Element & { name: string, value: string };
            data[elementWithName.name] = elementWithName.value as string;
        }
        try {
            const response = await fetch(emailApis.POST, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                nameErrorRef.current!.innerText = "";
                emailErrorRef.current!.innerText = "";
                messageErrorRef.current!.innerText = "";
                finalErrorRef.current!.innerText = "";
                const errors = await response.json();
                if (response.status === 400) {
                    Object.entries(errors).forEach((error) => {
                        if (error[0] === "name") {
                            nameErrorRef.current!.innerText = error[1] as string;
                        } else if (error[0] === "email") {
                            emailErrorRef.current!.innerText = error[1] as string;
                        } else if (error[0] === "message") {
                            messageErrorRef.current!.innerText = error[1] as string;
                        }
                    });
                    finalErrorRef.current!.innerText = layoutData!.something_went_wrong
                }
                if (response.status === 500) {
                    messageErrorRef.current!.innerText = errors.error;
                }
            } else {
                nameErrorRef.current!.innerText = "";
                emailErrorRef.current!.innerText = "";
                const eventTarget = e.target as HTMLFormElement;
                eventTarget.classList.add("active");
                eventTarget.innerHTML = "";
                for (const input of inputs) {
                    const elementWithName = input as Element & { name: string, value: string };
                    elementWithName.value = "";
                }
            }
        } catch (e) {
            finalErrorRef.current!.innerText = 'Something went wrong'
            console.warn(e);
        }
    };
    return (
        <div>
            {layoutIsLoading && <Loading />}
            {layoutIsError && <ErrorHandler error={layoutError} />}
            {layoutData &&
                <form
                    className={`${styles["contact-form-inputs"]} p2 text-shadow`}
                    name="contact"
                    onSubmit={onsubmitHandler}
                    success-msg={layoutData.msg_sended}
                >
                    <input
                        className={`${styles["contact-form-input"]} text-shadow`}
                        name="name"
                        placeholder={layoutData.msg_name}
                        required
                        maxLength={50}
                        minLength={1}
                    />
                    <span className={styles["contact-form-result"]} ref={nameErrorRef} ></span>
                    <input
                        className={`${styles["contact-form-input"]} text-shadow`}
                        name="email"
                        placeholder="EMAIL"
                        required
                        pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        type="email"
                        title={layoutData.msg_invalid_email}
                    />
                    <span className={styles["contact-form-result"]} ref={emailErrorRef} ></span>
                    <textarea
                        className={`${styles["contact-form-input"]} text-shadow`}
                        rows={5}
                        maxLength={200}
                        name="message"
                        required
                        placeholder={layoutData.msg_message}
                        minLength={10}
                    />
                    <span className={styles["contact-form-result"]} ref={messageErrorRef}></span>
                    <button className={styles["contact-form-button"]}>SEND</button>
                    <span className={styles["contact-form-result"]} ref={finalErrorRef}></span>
                </form>
            }
        </div>
    )
}