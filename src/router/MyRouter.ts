import * as core from "express-serve-static-core";
import {Router} from 'express';
export class MyRouterBinder{
    private _router : core.Router;
    private _path:string;
    constructor(path:string){
        this._router = Router();
        this._path = path;
    }
    public get path():string{
        return this._path;
    }
    public get router(): core.Router{
        return this._router;
    }
}