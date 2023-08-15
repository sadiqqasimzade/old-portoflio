import { memo } from "react";
import { Hexagon, HexagonPostion, HexagonTechnolgy } from './hexagon'
import styles from './hexagon.module.scss'

export type HexagonData = {
    text: string, technologies: HexagonTechnolgy[]
}
type Props = {
    hexagonData: HexagonData[]
}
export const HexagonHoney = memo(({ hexagonData }: Props) => {
    const postions: HexagonPostion[] = ['top-left', 'top-right', 'left', 'right', 'bottom-left', 'bottom-right', undefined]
    return (
        <div className={styles["hexagon-container"]}>
            {hexagonData.map((hexagon, index) =>
                <Hexagon
                    key={hexagon.text}
                    title={hexagon.text}
                    technologies={hexagon.technologies}
                    position={postions[index]}
                ></Hexagon>)}
        </div>
    );
})