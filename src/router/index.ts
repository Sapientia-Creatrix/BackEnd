import { Router, Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";

const router: Router = Router();

const normalizedPath: string = path.join(__dirname);

//自動註冊此目錄下具有".routes."的ts
fs.readdirSync(normalizedPath).forEach(file => {
    if (file.includes(".routes.") && !file.includes("index.")) {
        router.use(require(`./${file}`).path, require(`./${file}`).router);
        console.log(`registed route: ${file}`);
    }
});

router.get("/", (req: Request, res: Response) => {
    const msg = {
        message: "Main route is empty."
    };
    res.json(msg);
});

export default router;
