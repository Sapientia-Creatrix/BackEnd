import { Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";
import { ModelCourse } from "../models/ModelCourse";
import { ModelCourseHistory } from "../models/ModelCourseHistory";
import { ModelCourseComment } from "../models/ModelCourseComment";

const binder = new MyRouterBinder("/course");
const modelCourse = new ModelCourse();
const modelCourseHistory = new ModelCourseHistory();
const modelCourseComment = new ModelCourseComment();

//查詢課程
binder.router.get("/", async (req: Request, res: Response) => {
    //有ID的話 根據ID查課程 沒有的話回傳全部課程(only admin)
    try{
        let id:number = Number(req.query.id);
        if(id==undefined || !id){
            const result = await modelCourse.findAll();
            res.json(result);
        }else{
            const result = await modelCourse.find(id);
            res.json(result);
        }
    }catch(err){
        console.log(err);
        res.json([]);
    }
});


//add course (only admin)
binder.router.post("/", async(req:Request, res:Response) => {
    try{
        let name:string = req.body.name;
        let university:string = req.body.university;
        let url:string = req.body.url;
        let difficulty:number = Number(req.body.difficulty);
        let rate:number = Number(req.body.rate);
        let skills:string = req.body.skills;
        const result = await modelCourse.add(name, university,url, difficulty,rate, skills);
        res.sendStatus(200);
    }catch(err){
        res.sendStatus(403);
    }
});

//update course (only admin)
binder.router.put("/", async(req:Request, res:Response) => {
    try{
        let id:number = Number(req.body.id);
        let name:string = req.body.name;
        let university:string = req.body.university;
        let url:string = req.body.url;
        let difficulty:number = Number(req.body.difficulty);
        let rate:number = Number(req.body.rate);
        let skills:string = req.body.skills;
        let popularity : number = Number(req.body.popularity);
        const result = await modelCourse.update(id, name,university, url, difficulty, rate, skills, popularity);
        res.sendStatus(200);
    }catch(err){
        res.sendStatus(403);
    }
});

//delete course (only admin)
binder.router.delete("/", async(req:Request, res:Response) => {
    try{
        let id:number = Number(req.query.id);
        if(id==undefined || !id){
            res.sendStatus(403);
        }else{
            const result = await modelCourse.delete(id);
            res.sendStatus(200);
        }
    }catch(err){
        res.sendStatus(403);
    }
});

//搜尋課程紀錄
binder.router.get("/history", async (req:Request, res:Response) => {
    try{
        let userId:number = Number(req.query.id);
        if(req.query.course == undefined){
            const result = await modelCourseHistory.findAll(userId);
            res.json(result);
        }else{
            let courseId:number = Number(req.query.course);
            const result = await modelCourseHistory.find(userId, courseId);
            res.json(result);
        }
    }catch(err){
        res.json([]);
    }
});

//完成課程
binder.router.post("/complete", async(req:Request, res:Response) => {
    try{
        let userId:number = Number(req.body.userId);
        let courseId:number = Number(req.body.courseId);
        const result = await modelCourseHistory.update(userId, courseId, 100);
        res.sendStatus(200);
    }catch(err){
        res.sendStatus(403);
    }
});

//新增課程分數 評論
binder.router.post("/credit", async(req:Request, res:Response) => {
    try{
        let userId:number = Number(req.body.userId);
        let courseId:number = Number(req.body.courseId);
        let rate: number = Number(req.body.rate);
        let context:string = req.body.context;
        const result = await modelCourseComment.add(userId, courseId,rate, context);
        res.sendStatus(200);
    }catch(err){
        res.sendStatus(403);
    }
});

//查詢課程分數 評論
binder.router.get("/credit", async(req:Request, res:Response) => {
    try{
        let courseId:number = Number(req.query.courseId);
        const result = await modelCourseComment.find(courseId);
        res.json(result);
    }catch(err){
        res.json([]);
    }
});

//點擊課程
binder.router.post("/click", async(req:Request, res:Response) => {
    try{
        let user_id: number = Number(req.body.user_id);
        let course_id: number = Number(req.body.course_id);
        if((await modelCourse.exist(course_id))==false){
            res.sendStatus(403);
        }else{
            const array =  await modelCourse.find(course_id);
            if(array.length  <0)res.sendStatus(403);
            const course = array[0];
            const result = await modelCourse.update(course.id, course.name, course.university, 
                course.url, course.difficulty, course.rate, course.skills, course.popularity+1);
        }
        
        res.sendStatus(200);

    }catch(err){
        res.sendStatus(403);
    }
});

//買課程
binder.router.post("/buy", async(req:Request, res:Response) => {
    try{
        let user_id:number = Number(req.body.user_id);
        let course_id:number = Number(req.body.course_id);
        const result = await modelCourseHistory.add(user_id, course_id, 0);
        res.sendStatus(200);
    }catch(err){
        res.sendStatus(403);
    }

});



module.exports = binder;