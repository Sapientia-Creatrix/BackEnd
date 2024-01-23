import { Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";
import { ModelUser } from "../models/ModelUser";

const binder = new MyRouterBinder("/user");
const modelUser = new ModelUser();


binder.router.get("/", async (req: Request, res: Response) => {
    try{
        let id:number = req.query.id;
        if(id === undefined){
            const result = await modelUser.findAll();
            res.json(result);
        }
        else{ //query user by id
            res.json(await modelUser.find(id));
        }
    }catch(err){
        console.log(err);
        res.json([]);
    }
    
    // console.log(`id=${id}`);

    //query all user (only for admin)
    
    
});


//add user
binder.router.post("/", async(req:Request, res:Response) => {
    try{
        let name:string = req.body.name;
        let password_hash:string = String(req.body.password);
        console.log(name, password_hash);
        if(name==undefined ||password_hash==undefined){
            res.sendStatus(403);
        }else{
            const result = await modelUser.add(name,password_hash);
            console.log("result=",result);
            res.sendStatus(200);
        }
    }catch(error){
        res.sendStatus(403);
    }
    
});

//update user
binder.router.put("/", async(req:Request, res:Response) => {
    try{
        let id:number = Number(req.query.id);
        console.log(`id=${req.query.id}`);
        let name:string = req.query.name;
        let password_hash:string = req.query.password;
        let skills:string = req.query.skills;
        let learning_path:string = req.query.learning_path;
        let coin:number = Number(req.query.coin);
        if(id==undefined || !id){
            res.sendStatus(403);
        }else {
            await modelUser.update(id,name,password_hash,skills,learning_path,coin);
            res.sendStatus(200);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(403);
    }
    
})

//delete user
binder.router.delete("/", async(req:Request, res:Response) => {
    try{
        let id:number = Number(req.query.id);
        console.log(id);
        await modelUser.delete(id);
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(403);
    }
});


module.exports = binder;