import { az_layoutJson } from "@/src/constants/layout/az_layout";
import { en_layoutJson } from "@/src/constants/layout/en_layout";
import { ru_layoutJson } from "@/src/constants/layout/ru_layout";
import { LayoutDataType } from "@/src/store/types/layoutType";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const lang = req.headers["accept-language"]
        if (lang == 'az') {
            const a:LayoutDataType=az_layoutJson //type checker
            return res.status(200).json(a)
        }
        else if (lang == 'ru') {
             const a:LayoutDataType=ru_layoutJson //type checker
             return res.status(200).json(a)
        }
        else {
             const a:LayoutDataType=en_layoutJson //type checker
             return res.status(200).json(a)
        }
    }
    else {
        return res.status(500).json({ error: '=(' })
    }
}