import { useDispatch } from 'react-redux'
import './modal.module.scss'
import { PropsWithChildren, useEffect, useState } from 'react'
import ModalWithSlider from '../../features/modalWithSlider/modalWithSlider'
import { changeModalState } from '@/src/store/reducers/appSlice'
import styles from './modal.module.scss'



type TransitionStage = typeof styles['modal-fin'] | typeof styles['modal-fout'];

export default function Modal({ }: PropsWithChildren) {
    const dispatch = useDispatch()
    const [transitionStage, setTransistionStage] = useState<TransitionStage>(styles["modal-fin"]);

    //Keypress eventlistener
    useEffect(() => {
        function handekeydown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setTransistionStage(styles["modal-fout"]);
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
                if (transitionStage === styles["modal-fout"]) {
                    dispatch(changeModalState(false))
                }
            }}
        >
            <div className={styles["modal-container"]}
                onClick={() => {
                    setTransistionStage(styles['modal-fout'])
                }}>
                <div className={styles["modal-inner"]}
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