import { IModel } from "./IModel"
import database from "../database/database";
import * as dotenv from 'dotenv';
dotenv.config();

export class ModelUser implements IModel {
    constructor(){};
    async findAll(){
        const str = "select * from user where deleted = false";
        const connection = await database.getConnection();
        const rows = await connection.query(str);
        connection.release();
        return rows;
    }
    async find(id:number){
        const str = "select * from user where id = ? and deleted = false";
        const connection = await database.getConnection();
        const result = await connection.query(str,[id]);
        connection.release();
        return result;
    }
    async add(name:string, password_hash:string){
        const str = "insert into user(name, password_hash) values (?, ?)";
        const connection = await database.getConnection();
        const result = await connection.query(str, [name, password_hash]);
        connection.release();
        return result;
    }
    async update(id:number, name?:string, password_hash?:string, skills?:string, learning_path?:string, coin?:number){
        const array = await this.find(id);
        if(array.lenght!=0){
            const user = array[0];
            name = name || user.name;
            password_hash = password_hash || user.password_hash;
            skills = skills || user.skills;
            learning_path = learning_path || user.learning_path ;
            coin = coin || user.coin;
            console.log(`name=${name}\npassword_hash=${password_hash}\nskills=${skills}\nlearning_path=${learning_path}\ncoin=${coin}`);
        }
        
        const str = "update user set name=?, password_hash=?, skills=?, learning_path=?, coin=? where id= ? and deleted = false";
        const connection = await database.getConnection();
        const result = await connection.query(str, [id, name, password_hash, skills, learning_path, coin, id]);
        connection.release();
        return result;
    }
    async delete(id:number){
        const str = "update user set \`deleted\`=true where \`id\`=?";
        const connection = await database.getConnection();
        const result = await connection.query(str, [id]);
        connection.release();
        return result;
    }
}