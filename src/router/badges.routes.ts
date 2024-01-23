import { Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";
import { Badge } from "../Objects/Badge";
import { ModelBadge } from "../models/ModelBadge";

const binder = new MyRouterBinder("/badges");
const modelBadge = new ModelBadge();

//查詢獎盃 沒有ID則回傳所有種類
binder.router.get("/", async(req: Request, res: Response) => {
    try{
        if(req.query.id == undefined){
            const result = await modelBadge.findAll();
            res.json(result);
        }else{
            let id:number = Number(req.query.id);
            const result = await modelBadge.find(id);
            res.json(result);
        }
    }catch(err){
        res.json([]);
    }
});


binder.router.post("/", async (req: Request, res: Response) => {
    try{
        let userId:number = Number(req.body.userId);
        let badgeId:number = Number(req.body.badgeId);
        const result = await modelBadge.add(userId, badgeId);
        res.sendStatus(200);
    }catch(err){
        res.sendStatus(403);
    }   
});

module.exports = binder;
