import { IModel } from "./IModel";
import database from "../database/database";
import * as dotenv from 'dotenv';
dotenv.config();

export class ModelCourseComment implements IModel {
    async findAll(){
        const str = "select * from courseComment;";
        const connection = await database.getConnection();
        const rows = await connection.query(str, null, ["id", "user_id", "course_id", "rate", "context"]);
        connection.release();
        return rows;
    }
    async find(courseId: number){
        const str = "select * from courseComment where course_id = ? ;";
        const connection = await database.getConnection();
        const rows = await connection.query(str, [courseId],["id", "user_id", "course_id", "rate", "context"]);
        connection.release();
        return rows;
    }
    async add(userId:number, courseId: number, rate:number, context:string){
        const str = "insert into courseComment (user_id, course_id, rate, context) value(?,?,?,?);";
        const connection = await database.getConnection();
        const result = await connection.query(str, [courseId, userId, rate, context],[]);
        connection.release();
        return result;
    }
}