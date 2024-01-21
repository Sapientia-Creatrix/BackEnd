import {Request, Response } from "express";
import { MyRouter } from "./MyRouter";


const router = new MyRouter("/status");

router.getRouter().get("/", (req: Request, res: Response) => {
    const msg = {
        status: "200 OK",
        message: "API is up and running."
    };
    res.json(msg);
});

export { router };
