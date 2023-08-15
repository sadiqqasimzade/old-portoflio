import { useSelector } from "react-redux"
import Modal from "./modal"
import { getModalState } from "@/src/store/selectors/appSelectors"

export const ModalContainer = () => {
    const isActive = useSelector(getModalState)

    return (
        <>
            {isActive ? <Modal /> : null}
        </>
    )
}