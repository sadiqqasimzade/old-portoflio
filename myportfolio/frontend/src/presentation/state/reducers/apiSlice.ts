// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { aboutApis, layoutApis, navApis, projectApis, skillApis, socialApis, technologyApis } from 'src/presentation/utils/apis'
import { AboutDataType } from '../types/aboutType'
import { LayoutDataType } from '../types/layoutType'
import { NavDataType } from '../types/navType'
import { ProjectDataType } from '../types/projectType'
import { SkillDataType } from '../types/skillType'
import { SocialDataType } from '../types/socialType'
import { technologyDataType } from '../types/technologyType'

// Define our single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        mode: 'no-cors',
        prepareHeaders(headers) {
            headers.set('Access-Control-Allow-Origin', '*')
            return headers
        },
    }),
    endpoints: builder => ({
        fetchAbout: builder.query<AboutDataType[], { language: string }>({
            query: (e) => ({ url: aboutApis.GETALL, headers: { "Accept-Language": e.language } })
        }),
        fetchLayout: builder.query<LayoutDataType, { language: string }>({
            query: (e) => ({ url: layoutApis.GETALL, headers: { "Accept-Language": e.language } })
        }),
        fetchNav: builder.query<NavDataType[], { language: string }>({
            query: (e) => ({ url: navApis.GETALL, headers: { "Accept-Language": e.language } })
        }),
        fetchProject: builder.query<ProjectDataType[], { language: string }>({
            query: (e) => ({ url: projectApis.GETALL, headers: { "Accept-Language": e.language } })
        }),
        fetchSkill: builder.query<SkillDataType[], { language: string }>({
            query: (e) => ({ url: skillApis.GETALL, headers: { "Accept-Language": e.language } })
        }),
        fetchSocial: builder.query<SocialDataType[], void>({
            query: () => socialApis.GETALL
        }),
        fetchTechnology: builder.query<technologyDataType[], { language: string }>({
            query: (e) => ({ url: technologyApis.GETALL, headers: { "Accept-Language": e.language } })
        })
    }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useFetchAboutQuery, useFetchLayoutQuery, useFetchNavQuery, useFetchProjectQuery, useFetchSkillQuery, useFetchSocialQuery, useFetchTechnologyQuery } = apiSlice
