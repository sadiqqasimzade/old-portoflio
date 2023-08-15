import { az_projectJson } from "@/src/constants/project/az_project";
import { en_projectJson } from "@/src/constants/project/en_project";
import { projectJson } from "@/src/constants/project/project";
import { ru_projectJson } from "@/src/constants/project/ru_project";
import { ProjectDataType } from "@/src/store/types/projectType";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const lang = req.headers["accept-language"]
        if (lang == 'az') {
            const combined: ProjectDataType[] = az_projectJson.map((item, index) => ({
                description: item.description,
                file_path: projectJson[index].image,
                link: projectJson[index].link,
                title: projectJson[index].title,
                image: projectJson[index].image,
                technologies: projectJson[index].technologies,
            }));
            return res.status(200).json(combined)
        }
        else if (lang == 'ru') {
            const combined: ProjectDataType[] = ru_projectJson.map((item, index) => ({
                description: item.description,
                file_path: projectJson[index].image,
                link: projectJson[index].link,
                title: projectJson[index].title,
                image: projectJson[index].image,
                technologies: projectJson[index].technologies,
            }));
            return res.status(200).json(combined)
        }
        else {
            const combined: ProjectDataType[] = en_projectJson.map((item, index) => ({
                description: item.description,
                file_path: projectJson[index].image,
                link: projectJson[index].link,
                title: projectJson[index].title,
                image: projectJson[index].image,
                technologies: projectJson[index].technologies,
            }));
            return res.status(200).json(combined)
        }
    }
    else {
        return res.status(500).json({ error: '=(' })
    }
}