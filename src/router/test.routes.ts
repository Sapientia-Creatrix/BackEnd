import { Request, Response } from "express";
import { MyRouter } from "./MyRouter";

const router = new MyRouter("/test");

router.getRouter().get("/", (req: Request, res: Response) => {
    const msg = {
        message: "TESTING EVERYTHING!!!",
        myRandomKey: "myRandomValue"
    };
    res.json(msg);
});

export { router };
