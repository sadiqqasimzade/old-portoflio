import { az_navJson } from "@/src/constants/nav/az_nav";
import { en_navJson } from "@/src/constants/nav/en_nav";
import { navJson } from "@/src/constants/nav/nav";
import { ru_navJson } from "@/src/constants/nav/ru_nav";
import { NavDataType } from "@/src/store/types/navType";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const lang = req.headers["accept-language"]
        if (lang == 'az') {
            const combined: NavDataType[] = az_navJson.map((item, index) => ({
                title: item.title,
                file_path: navJson[index].file_path,
                href: navJson[index].href,
            }));
            return res.status(200).json(combined)
        }
        else if (lang == 'ru') {
            const combined: NavDataType[] = ru_navJson.map((item, index) => ({
                title: item.title,
                file_path: navJson[index].file_path,
                href: navJson[index].href,
            }));
            return res.status(200).json(combined)
        }
        else {
            const combined: NavDataType[] = en_navJson.map((item, index) => ({
                title: item.title,
                file_path: navJson[index].file_path,
                href: navJson[index].href,
            }));
            return res.status(200).json(combined)
        }
    }
    else {
        return res.status(500).json({ error: '=(' })
    }
}