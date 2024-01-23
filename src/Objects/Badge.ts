export class Badge{
    private _id:number;
    private _name:string;
    private _description?:string = null;

    constructor(id:number, name:string, description?:string) {
        this._id = id;
        this._name = name;
        this._description = description;
    }
    public get id():number { return this._id; }
    public get name():string { return this._name; }
    public get description():string { return this._description; }
}