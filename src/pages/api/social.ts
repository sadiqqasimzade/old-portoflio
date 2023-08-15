import { socialJson } from "@/src/constants/social/social";
import { SocialDataType } from "@/src/store/types/socialType";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const a:SocialDataType[]=socialJson //type checker
        return res.status(200).json(a)
    }
    else {
        return res.status(500).json({ error: '=(' })
    }
}