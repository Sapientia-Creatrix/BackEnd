export class Course{
    private _name:string;
    private _university:string;
    private _url:string;
    private _difficulty:Difficulty;
    private _rate:Number;
    private _skills:string;
    private _description:string;
    private _comments:CourseComment[];
    //=====================getter=========================
    public get name():string{return this._name;};
    public get university():string{return this._university;};
    public get url():string{return this._url;};
    public get difficulty():Difficulty{return this._difficulty;};
    public get rate():Number{return this._rate;};
    public get skills():string{return this._skills;};
    public get description():string{return this._description;};
    public get comments():CourseComment[]{return this._comments;};
    //=====================================================
}

export class CourseComment{
    private _commentUserID:string;
    private _rate:Number;
    private _context:string;
    constructor(userID:string, rate:Number, context:string){
        this._commentUserID = userID;
        this._rate = rate;
        this._context = context;
    }
    //=========================getter==================================
    public get commentUserID():string{return this._commentUserID;}
    public get rate():Number{return this._rate;}
    public get context():string{return this._context;}
    //=====================================================

}

export enum Difficulty {
    Beginner = 1,
    Intermediate = 2,
    hard = 3,
    Conversant = 4,
    Advanced = 5,
    NotCalibrated=6,//課程的CSV中有些沒有難度
}

