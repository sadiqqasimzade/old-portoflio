import { useDispatch } from 'react-redux'
import './modal.scss'
import { PropsWithChildren, useEffect, useState } from 'react'
import { changeModalState } from 'src/presentation/state/reducers/appSlice'
import ModalWithSlider from '../../features/modalWithSlider/modalWithSlider'



export default ({ children }: PropsWithChildren) => {
    const dispatch = useDispatch()
    const [transitionStage, setTransistionStage] = useState<'modal-fin' | 'modal-fout'>("modal-fin");

    //Keypress eventlistener
    useEffect(() => {
        function handekeydown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setTransistionStage("modal-fout");
                window.removeEventListener("keydown", handekeydown);
            }
        }
        window.addEventListener("keydown", handekeydown);
        return () => window.removeEventListener("keydown", handekeydown);
    }, []);

    return (
        <div
            className={`${transitionStage}`}
            onAnimationEnd={() => {
                if (transitionStage === "modal-fout") {
                    dispatch(changeModalState(false))
                }
            }}
        >
            <div className="modal-container"
                onClick={() => {
                    setTransistionStage('modal-fout')
                }}>
                <div className="modal-inner"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}>
                    {/* {children} */}
                    <ModalWithSlider />
                </div>
            </div>
        </div>
    );
}