import {Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";


const binder = new MyRouterBinder("/status");

binder.router.get("/", (req: Request, res: Response) => {
    const msg = {
        status: "200 OK",
        message: "API is up and running."
    };
    res.json(msg);
});

module.exports = binder;
