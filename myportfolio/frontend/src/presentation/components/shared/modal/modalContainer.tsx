import { useSelector } from "react-redux"
import { getModalState } from "src/presentation/state/selectors/appSelectors"
import Modal from "./modal"

export const ModalContainer = () => {
    const isActive = useSelector(getModalState)

    return (
        <>
            {isActive ? <Modal /> : null}
        </>
    )
}