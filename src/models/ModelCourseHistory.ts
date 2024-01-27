import { IModel } from "./IModel";
import database from "../database/database";
import * as dotenv from 'dotenv';
import { Difficulty } from "../Objects/Course";
dotenv.config();

export class ModelCourseHistory implements IModel {
    async findAll(userId:number){
        const str = "select * from courseHistory where user_id = ?;";
        const connection = await database.getConnection();
        const rows = await connection.query(str,[userId],["id", "user_id", "course_id", "progress"]);
        connection.release();
        return rows;
    }
    async find(userId:number, courseId:number){
        const str = "select * from courseHistory where user_id = ? and course_id = ?;";
        const connection = await database.getConnection();
        const rows =await connection.query(str,[userId, courseId],["id", "user_id", "course_id", "progress"]);
        connection.release();
        return rows;
    }
    async exist(userId:number, courseId:number){
        const array = await this.find(userId, courseId);
        return array.length != 0;
    }
    async add(userId:number, courseId:number, progress:number){
        const str = "insert into courseHistory(user_id, course_id, progress) values(?,?,?);";
        const connection = await database.getConnection();
        const result = await connection.query(str,[userId,courseId,progress],[]);
        connection.release();
        return result;
    }
    async update(userId:number, courseId:number, progress:number){
        if((await this.exist(userId, courseId))==false){
            return await this.add(userId, courseId, progress);
        }
        const str = "update courseHistory set progress = ? there user_id = ? and  course_id =?;";
        const connection = await database.getConnection();
        const result = await connection.query(str,[progress, userId, courseId],[]);
        connection.release();
        return result;
    }
    async delete(userId:number, courseId:number){
        const str = "delete from courseHistory where user_id = ? and course_id =?;";
        const connection = await database.getConnection();
        const result = await connection.query(str,[userId, courseId],[]);
        connection.release();
        return result;
    }
}