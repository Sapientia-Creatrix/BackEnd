import { Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";
import { ModelOnlineTime } from "../models/ModelOnlineTime";

const binder = new MyRouterBinder("/daliytime");
const modelOnlineTime = new ModelOnlineTime();

binder.router.get("/", async(req: Request, res: Response) => {
    try{
        let id:number = Number(req.query.id);
        const rows = await modelOnlineTime.find(id);
        res.json(rows);
    }catch(err){
        res.json([]);
    }
    res.json([]);
});

binder.router.put("/", async(req: Request, res: Response) => {
    try{
        let id:number = Number(req.body.id);
        let date:string = req.body.date;
        let amount:number = Number(req.body.amount);
        if((await modelOnlineTime.exist(id, date))){
            const time = await modelOnlineTime.find(id)[0];
            const result = await modelOnlineTime.update(id, date, amount + time.count);
            res.sendStatus(200);
        }else{
            const result = await modelOnlineTime.add(id, date);
            const result2 = await modelOnlineTime.update(id, date, amount + 1);
            res.sendStatus(200);
        }
    }catch(err){
        res.sendStatus(403);
    }
});

module.exports = binder;
