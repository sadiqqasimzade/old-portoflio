import { az_technologyJson } from "@/src/constants/technology/az_technology";
import { en_technologyJson } from "@/src/constants/technology/en_technology";
import { ru_technologyJson } from "@/src/constants/technology/ru_technology";
import { technologyJson } from "@/src/constants/technology/technology";
import { technologyDataType } from "@/src/store/types/technologyType";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const lang = req.headers["accept-language"]
        if (lang == 'az') {
            const combined: technologyDataType[] = az_technologyJson.map((item, index) => ({
                help_text: item.help_text,
                file_path:technologyJson[index].img,
                name:technologyJson[index].name
            }));
            return res.status(200).json(combined)
        }
        else if (lang == 'ru') {
            const combined: technologyDataType[] = ru_technologyJson.map((item, index) => ({
                help_text: item.help_text,
                file_path:technologyJson[index].img,
                name:technologyJson[index].name
            }));
            return res.status(200).json(combined)
        }
        else {
            const combined: technologyDataType[] = en_technologyJson.map((item, index) => ({
                help_text: item.help_text,
                file_path:technologyJson[index].img,
                name:technologyJson[index].name
            }));
            return res.status(200).json(combined)
        }
    }
    else {
        return res.status(500).json({ error: '=(' })
    }
}