import { FormEvent, useRef } from "react";
import { useFetchLayoutQuery } from "src/presentation/state/reducers/apiSlice";
import { emailApis } from "src/presentation/utils/apis";
import { Loading } from "../../common/loading/loading";
import { ErrorHandler } from "../../common/error/error";
import { useSelector } from "react-redux";
import { getAppLanguage } from "src/presentation/state/selectors/appSelectors";

export default () => {
    const { data: layoutData, isLoading: layoutIsLoading, isError: layoutIsError, error: layoutError } = useFetchLayoutQuery({ language: useSelector(getAppLanguage) })
    const nameErrorRef = useRef<HTMLSpanElement>(null);
    const emailErrorRef = useRef<HTMLSpanElement>(null);
    const messageErrorRef = useRef<HTMLSpanElement>(null);
    const finalErrorRef = useRef<HTMLSpanElement>(null);
    const onsubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        finalErrorRef.current!.innerText = layoutData!.loading
        const data = {};
        const inputs = e.target.querySelectorAll("input,textarea");
        for (const input of inputs) {
            data[input.name] = input.value;
        }

        let csrftoken;
        const cookieArr = document.cookie.split(";");
        for (let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].split("=");
            if ("csrftoken" === cookiePair[0].trim()) {
                csrftoken = decodeURIComponent(cookiePair[1]);
            }
        }
        const headers = {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        };
        try {
            const response = await fetch(emailApis.POST, {
                method: "POST",
                headers: headers,
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
                            nameErrorRef.current!.innerText = error[1];
                        } else if (error[0] === "email") {
                            emailErrorRef.current!.innerText = error[1];
                        } else if (error[0] === "message") {
                            messageErrorRef.current!.innerText = error[1];
                        }
                    });
                    finalErrorRef.current!.innerText = layoutData!.something_went_wrong
                }
                if (response.status === 500) {
                    messageErrorRef.current!.innerText = errors;
                }
            } else {
                nameErrorRef.current!.innerText = "";
                emailErrorRef.current!.innerText = "";
                e.target.classList.add("active");
                e.target.innerHTML = "";
                for (const input of inputs) {
                    input.value = "";
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
                    className="contact-form-inputs p2 text-shadow"
                    name="contact"
                    onSubmit={onsubmitHandler}
                    success-msg={layoutData.msg_sended}
                >
                    <input
                        className="contact-form-input text-shadow"
                        name="name"
                        placeholder={layoutData.msg_name}
                        required
                        maxLength={50}
                        minLength={1}
                    />
                    <span className="contact-form-result" ref={nameErrorRef} ></span>
                    <input
                        className="contact-form-input text-shadow"
                        name="email"
                        placeholder="EMAIL"
                        required
                        pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        type="email"
                        title={layoutData.msg_invalid_email}
                    />
                    <span className="contact-form-result" ref={emailErrorRef} ></span>
                    <textarea
                        className="contact-form-input text-shadow"
                        rows={5}
                        maxLength={200}
                        name="message"
                        required
                        placeholder={layoutData.msg_message}
                        minLength={10}
                    />
                    <span className="contact-form-result" ref={messageErrorRef}></span>
                    <button className="contact-form-button">SEND</button>
                    <span className="contact-form-result" ref={finalErrorRef}></span>

                </form>
            }
        </div>
    )
}