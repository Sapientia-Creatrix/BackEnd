import {Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";


const binder = new MyRouterBinder("/suggest");

binder.router.get("/", (req: Request, res: Response) => {
    
});

module.exports = binder;
