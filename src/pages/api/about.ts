import { aboutJson } from "@/src/constants/about/about";
import { az_aboutJson } from "@/src/constants/about/az_about";
import { en_aboutJson } from "@/src/constants/about/en_about";
import { ru_aboutJson } from "@/src/constants/about/ru_about";
import { AboutDataType } from "@/src/store/types/aboutType";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const lang = req.headers["accept-language"]
        if (lang == 'az') {
            const combined: AboutDataType[] = az_aboutJson.map((item, index) => ({
                title: item.title,
                desc: item.text,
                path: aboutJson[index].file_path,
            }));
            return res.status(200).json(combined)
        }
        else if (lang == 'ru') {
            const combined: AboutDataType[] = ru_aboutJson.map((item, index) => ({
                title: item.title,
                desc: item.text,
                path: aboutJson[index].file_path,
            }));
            return res.status(200).json(combined)
        }
        else {
            const combined: AboutDataType[] = en_aboutJson.map((item, index) => ({
                title: item.title,
                desc: item.text,
                path: aboutJson[index].file_path,
            }));
            return res.status(200).json(combined)
        }
    }
    else {
        return res.status(500).json({ error: '=(' })
    }
}