import { IModel } from "./IModel";
import database from "../database/database";
import * as dotenv from 'dotenv';
dotenv.config();

export class ModelBadge implements IModel {
    async findAll(){
        const str = "select * from badge;";
        const connection = await database.getConnection();
        const rows = await connection.query(str, [], ["id", "user_id", "badge_id", "date", "display"]);
        connection.release();
        return rows;
    }
    async find(userId:number){
        const str = "select * from userBadge where user_id = ?;";
        const connection = await database.getConnection();
        const rows = await connection.query(str, [userId],[]);
        connection.release();
        return rows;
    }
    async add(userId:number, badgeId:number){
        const str = "insert into userBadge (user_id, badge_id) values (?,?);";
        const connection = await database.getConnection();
        const result = await connection.query(str, [userId, badgeId], []);
        connection.release();
        return result;
    }

}