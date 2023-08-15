import { changeModalState, changePortfolioQuery } from "@/src/store/reducers/appSlice";
import { memo } from "react";

import { useDispatch } from "react-redux";
import styles from './hexagon.module.scss'
export type HexagonPostion = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right' | undefined;

export type HexagonTechnolgy = {
    icon: string,
    name: string
}
type Props = {
    position?: HexagonPostion
    title: string;
    technologies: HexagonTechnolgy[];
}

export const Hexagon = memo(({ position, title, technologies }: Props) => {
    const dispatch = useDispatch()
    function handleClick(): void {
        dispatch(changeModalState(true))
        dispatch(changePortfolioQuery(technologies.map(tech => tech.name)))
    }

    return (
        <div
            className={`${styles["hexagon"]} ${position ? `${styles[`hexagon-${position}`]}` : ""}`}>
            <div className={styles["hexagon-inner"]} onClick={handleClick}>
                <p className={`fw-bold ${styles["hexagon-title"]}`}>{title}</p>
                <div className={styles["hexagon-inner-container"]}>
                    {technologies.map((tech) => <img key={tech.name} className={styles["hexagon-img"]} src={`${tech.icon}`} alt="technology" />
                    )}
                </div>
            </div>
        </div>
    );
})