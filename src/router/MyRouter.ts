import * as core from "express-serve-static-core";
import {Router} from 'express';
export class MyRouter{
    private router : core.Router;
    private path:string;
    constructor(path:string){
        this.router = Router();
        this.path = path;
    }
    public getPath():string{
        return this.path;
    }
    public getRouter(): core.Router{
        return this.router;
    }
}