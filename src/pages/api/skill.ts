import { skillJson } from "@/src/constants/skill/skill";
import { SkillDataType } from "@/src/store/types/skillType";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const a:SkillDataType[]=skillJson
        res.status(200).json(a)
    }
    else {
        return res.status(500).json({ error: '=(' })
    }
}