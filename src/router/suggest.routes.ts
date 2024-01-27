import {Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";
import { PythonShell,Options } from "python-shell";
import * as path from "path";


const binder = new MyRouterBinder("/suggest");
const RECOMMEND_SYSTEM_LOCATION = path.join(process.env.RECOMMEND_SYSTEM_LOCATION);
console.log(`RECOMMEND_SYSTEM_LOCATION=${RECOMMEND_SYSTEM_LOCATION}`);


// 初始化特徵
binder.router.get("/basic", async (req: Request, res: Response) => {
    try{
        let id:number = Number(req.query.id);
        let location:string = path.join(RECOMMEND_SYSTEM_LOCATION, "LearningCourseRecommender.py");
        let options:Options = {
            args:[String(id),"recommend"],
        };
        let array = [];
        
        PythonShell.run(location, options, function(err, stdout) {
            if(err){
                console.log(err);
            }else{
                let obj = JSON.parse(stdout[0]);
                // console.log(obj);
                res.json(obj);
            }
        });
    }catch(err){
        res.json([]);
    }
});

// 基於內容推薦
binder.router.get("/advance", async(req: Request, res: Response) => {
    try{
        let id:number = Number(req.query.id);
        let location:string = path.join(RECOMMEND_SYSTEM_LOCATION, "LearningCourseRecommender_advance.py");
        
        console.log("location: ", location);
        let options:Options = {
            args:[String(id),"recommend"],
        };
        PythonShell.run(location, options, function(err, stdout) {
            if(err){
                console.log(err);
            }else{
                let obj = JSON.parse(stdout[0]);
                // console.log(obj);
                res.json(obj);
            }
        });
        // res.json(array);
    }catch(err){
        res.json([]);
    }
});

//協同過濾
binder.router.get("/collaborative", async (req: Request, res: Response) => {
    try{
        let id:number = Number(req.query.id);
        let location:string = path.join(RECOMMEND_SYSTEM_LOCATION, "LearningCourseRecommender_collaborative.py");
        
        let options:Options = {
            args:[String(id),"recommend"],
        };
        PythonShell.run(location, options, function(err, stdout) {
            if(err){
                console.log(err);
            }else{
                let obj = JSON.parse(stdout[0]);
                // console.log(obj);
                res.json(obj);
            }
        });
        // res.json(array);
    }catch(err){
        res.json([]);
    }
});
module.exports = binder;
