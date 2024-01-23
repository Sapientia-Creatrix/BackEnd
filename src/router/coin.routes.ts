import { Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";
import { ModelUser } from "../models/ModelUser";

const binder = new MyRouterBinder("/coin");
const modelUser = new ModelUser();

binder.router.get("/", async(req: Request, res: Response) => {
    try{
        let id:number = Number(req.query.id);
        const result = await modelUser.find(id);
        if(result.length==0)res.json([]);
        else{
            res.json([{
                coin: result[0].coin,
            }])
        }
    }catch(err){
        res.json([]);
    }
});

binder.router.put("/", async(req: Request, res: Response) => {
    
});

module.exports = binder;
