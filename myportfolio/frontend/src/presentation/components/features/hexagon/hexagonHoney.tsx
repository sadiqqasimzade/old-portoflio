import { memo } from "react";
import { Hexagon, HexagonPostion, HexagonTechnolgy } from './hexagon'
import './hexagon.scss'
import { useFetchLayoutQuery } from "src/presentation/state/reducers/apiSlice";
import { useSelector } from "react-redux";
import { getAppLanguage } from "src/presentation/state/selectors/appSelectors";

export type HexagonData = {
    text: string, technologies: HexagonTechnolgy[]
}
type Props = {
    hexagonData: HexagonData[]
}
export const HexagonHoney = memo(({ hexagonData }: Props) => {
    const postions: HexagonPostion[] = ['top-left', 'top-right', 'left', 'right', 'bottom-left', 'bottom-right', undefined]
    return (
        <div className="hexagon-container">
            {hexagonData.map((hexagon, index) =>
                <Hexagon
                    title={hexagon.text}
                    technologies={hexagon.technologies}
                    position={postions[index]}
                ></Hexagon>)}
        </div>
    );
})