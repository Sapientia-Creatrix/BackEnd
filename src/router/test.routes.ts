import { Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";

const binder = new MyRouterBinder("/test");

binder.router.get("/", async(req: Request, res: Response) => {
    const msg = {
        message: "TESTING EVERYTHING!!!",
        myRandomKey: "myRandomValue"
    };
    res.json(msg);
});

module.exports = binder;
