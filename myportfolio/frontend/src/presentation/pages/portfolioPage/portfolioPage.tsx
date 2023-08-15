import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ErrorHandler } from "src/presentation/components/common/error/error";
import { Loading } from "src/presentation/components/common/loading/loading";
import { HexagonTechnolgy } from "src/presentation/components/features/hexagon/hexagon";
import { HexagonData, HexagonHoney } from "src/presentation/components/features/hexagon/hexagonHoney";
import { Container } from "src/presentation/components/shared/container";
import { useFetchLayoutQuery, useFetchSkillQuery, useFetchTechnologyQuery } from "src/presentation/state/reducers/apiSlice";
import { getAppLanguage } from "src/presentation/state/selectors/appSelectors";

export default () => {
    const language = useSelector(getAppLanguage)
    const { data: skillData, error: skillError, isLoading: skillIsLoading, isError: skillIsError } = useFetchSkillQuery({ language: language })
    const { data: technologyData, error: technologyerror, isLoading: technologyIsLoading, isError: technologyIsError } = useFetchTechnologyQuery({language:language})
    const { data: layoutData, isLoading: layoutIsLoading, isError: layoutIsError, error: layoutError } = useFetchLayoutQuery({ language: language })
    const [hexagonData, setHexagonData] = useState<HexagonData[]>([]);
    //data for hexagons
    useMemo(() => {
        if (skillData && technologyData && layoutData) {
            skillData.forEach(({ title, technologies }) => {
                const techs: HexagonTechnolgy[] = [];
                technologies.forEach((tech) => {
                    const t = technologyData.find(t => t.name === tech.name)
                    techs.push({ icon: t?.file_path, name: t?.name });
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
                <p className="hexagon-container-title">{layoutData.portfolio_page_helper}</p>
                <HexagonHoney hexagonData={hexagonData}></HexagonHoney>
            </>}
        </Container >
    );
}
