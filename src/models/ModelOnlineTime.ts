import { IModel } from "./IModel";
import database from "../database/database";
import * as dotenv from 'dotenv';
dotenv.config();


export class ModelOnlineTime implements IModel{
    async find(id:number){
        const str = "select * from onlineTime where user_id = ? and count > 0;";
        const connection = await database.getConnection();
        const rows = await connection.query(str,[id],["user_id", "date", "count"]);
        connection.release();
        return rows;
    }
    async exist(id:number, date:string){
        const str = "select * from onlineTime where user_id = ? and date = ? and count > 0;";
        const connection = await database.getConnection();
        const rows = await connection.query(str,[id, date]);
        connection.release();
        return rows.length > 0;
    }
    async add(id:number, date:string){
        const str = "insert into onlineTime (user_id, date) values(?,?)";
        const connection = await database.getConnection();
        const result = await connection.query(str,[id, date]);
        connection.release();
        return result;
    }
    async update(id:number, date:string, count:number){
        if((await this.exist(id, date)) == false){
            await this.add(id, date);
        }
        const str = "update onlineTime set count = ? where user_id = ? and date = ?";
        const connection = await database.getConnection();
        const result = await connection.query(str,[count,id, date]);
        connection.release();
        return result;
    }
    async getTotal(id:number){
        const str = "select user_id, SUM(`count`) as total_hours from onlineTime where user_id = ?;";
        const connection = await database.getConnection();
        const result = await connection.query(str,[id], ["total_hours"]);
        connection.release();
        return result;
    }
}