import { ErrorHandler } from "@/src/components/common/error/errorHandler";
import { Loading } from "@/src/components/common/loading/loading";
import { HexagonTechnolgy } from "@/src/components/features/hexagon/hexagon";
import { HexagonData, HexagonHoney } from "@/src/components/features/hexagon/hexagonHoney";
import { Container } from "@/src/components/shared/container";
import { useFetchSkillQuery, useFetchTechnologyQuery, useFetchLayoutQuery } from "@/src/store/reducers/apiSlice";
import { getAppLanguage } from "@/src/store/selectors/appSelectors";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "../../components/features/hexagon/hexagon.module.scss"
export default function PorfolioPage() {
    const language = useSelector(getAppLanguage)
    const { data: skillData, error: skillError, isLoading: skillIsLoading, isError: skillIsError } = useFetchSkillQuery({ language: language })
    const { data: technologyData, error: technologyerror, isLoading: technologyIsLoading, isError: technologyIsError } = useFetchTechnologyQuery({ language: language })
    const { data: layoutData, isLoading: layoutIsLoading, isError: layoutIsError, error: layoutError } = useFetchLayoutQuery({ language: language })
    const [hexagonData, setHexagonData] = useState<HexagonData[]>([]);
    //data for hexagons
    useMemo(() => {
        if (skillData && technologyData && layoutData) {
            skillData.forEach(({ title, technologies }) => {
                const techs: HexagonTechnolgy[] = [];
                technologies.forEach((tech) => {
                    const t = technologyData.find(t => t.name === tech.name)
                    techs.push({ icon: t!.file_path, name: t!.name });
                });
                setHexagonData((prev) => [
                    ...prev,
                    { text: title, technologies: techs },
                ]);
            });
            setHexagonData((prev) => [...prev, { text: layoutData?.all_technologies, technologies: [] }]);
        }
    }, [skillData, technologyData, layoutData]);
    return (
        <Container>
            {(skillIsLoading || technologyIsLoading || layoutIsLoading) && <Loading />}
            {skillIsError && <ErrorHandler error={skillError} />}
            {technologyIsError && <ErrorHandler error={technologyerror} />}
            {layoutIsError && <ErrorHandler error={layoutError} />}
            {(skillData && technologyData && layoutData) && <>
                <p className={styles["hexagon-container-title"]}>{layoutData.portfolio_page_helper}</p>
                <HexagonHoney hexagonData={hexagonData}></HexagonHoney>
            </>}
        </Container >
    );
}
