import { Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";

const binder = new MyRouterBinder("/user");


binder.router.get("/", async (req: Request, res: Response) => {
    let id:Number = req.query.id;
    console.log(`id=${id}`);

    //query all user (only for admin)
    if(id === undefined){
        res.json("undefined");
    }
    else{ //query user by id
        res.json(id);
    }
    
});


//add user
binder.router.post("/", async(req:Request, res:Response) => {

});

//update user
binder.router.put("/", async(req:Request, res:Response) => {

})

//delete user
binder.router.delete("/", async(req:Request, res:Response) => {
    
});


module.exports = binder;