import { memo } from "react";
import { useDispatch } from "react-redux";
import { changeModalState, changePortfolioQuery } from "src/presentation/state/reducers/appSlice";
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
            className={`hexagon ${position ? `hexagon-${position}` : ""}`}>
            <div className="hexagon-inner" onClick={handleClick}>
                <p className="fw-bold hexagon-title">{title}</p>
                <div className="hexagon-inner-container">
                    {technologies.map((tech, index) => <img className="hexagon-img" src={`/images/${tech.icon}`} alt="technology" />
                    )}
                </div>
            </div>
        </div>
    );
})