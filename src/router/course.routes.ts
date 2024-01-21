import { Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";

const binder = new MyRouterBinder("/course");

binder.router.get("/", async (req: Request, res: Response) => {
    //有ID的話 根據ID查課程 沒有的話回傳全部課程(only admin)

});


//add course (only admin)
binder.router.post("/", async(req:Request, res:Response) => {

});

//update course (only admin)
binder.router.put("/", async(req:Request, res:Response) => {

})

//delete course (only admin)
binder.router.delete("/", async(req:Request, res:Response) => {
    
});


module.exports = binder;