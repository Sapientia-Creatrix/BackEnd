import { Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";
import { ModelOnlineTime } from "../models/ModelOnlineTime";

const binder = new MyRouterBinder("/totaltime");
const modelOnlineTime = new ModelOnlineTime();

binder.router.get("/", async(req: Request, res: Response) => {
    try{
        let id:number = Number(req.query.id);
        const result = await modelOnlineTime.getTotal(id);
        res.json(result);
    }catch(err){
        res.json([]);
    }
});


module.exports = binder;
