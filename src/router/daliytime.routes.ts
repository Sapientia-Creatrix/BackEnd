import { Request, Response } from "express";
import { MyRouterBinder } from "./MyRouter";

const binder = new MyRouterBinder("/daliytime");

binder.router.get("/", async(req: Request, res: Response) => {
    res.json([]);
});

binder.router.put("/", async(req: Request, res: Response) => {
    res.sendStatus(200);
});

module.exports = binder;
