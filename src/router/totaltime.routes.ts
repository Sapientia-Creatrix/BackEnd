import { Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";

const binder = new MyRouterBinder("/totaltime");

binder.router.get("/", async(req: Request, res: Response) => {
    const msg = {
        message: "TESTING EVERYTHING!!!",
        myRandomKey: "myRandomValue"
    };
    res.json(msg);
});

binder.router.put("/", async (req: Request, res: Response) => {

});

module.exports = binder;
