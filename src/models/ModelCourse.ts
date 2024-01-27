import { IModel } from "./IModel";
import database from "../database/database";
import * as dotenv from 'dotenv';
import { Difficulty } from "../Objects/Course";
dotenv.config();


export class ModelCourse implements IModel {
    constructor(){}
    async findAll(){
        const str = "select * from course";
        const connection = await database.getConnection();
        const rows =await connection.query(str, null, ["id", "name", "university", "url", "difficulty", "rate", "description", "popularity", "deleted"]);
        connection.release();
        return rows;
    }
    async find(id:number){
        const str = "select * from course where id=?";
        const connection = await database.getConnection();
        const rows =await  connection.query(str,[id],["id", "name", "university", "url", "difficulty", "rate", "description", "popularity", "deleted"]);
        connection.release();
        return rows;
    }
    async add(name:string, university:string, url:string, difficulty:Difficulty, rate:number, skills:string){
        // const str = `insert into course (name, university, url, difficulty,rate,skills) values(${name}, ${university}, ${url},  ${difficulty}, ${rate}, ${skill});`;
        const str = "insert into course (name, university, url, difficulty,rate,skills) values(?,?,?,?,?,?);"
        const connection = await database.getConnection();
        const result =await  connection.query(str,[name, university,url, difficulty,rate, skills],);
        // const result = await connection.query(str);
        connection.release();
        return result;
    }
    async update(id:number,name:string, university:string, url:string, difficulty:Difficulty, rate:number, skills:string, popularity:number){
        const array = await this.find(id);
        if(array.length!=0){
            const course = array[0];
            name  = name || course.name;
            university = university || course.university;
            url = url || course.url;
            difficulty = difficulty || course.difficulty;
            rate = rate || course.rate;
            skills = skills || course.skills;
            popularity = popularity || course.popularity;
        }
        const str = "update course set name=? , university=?, url=? , difficulty=? ,rate=?, skills=?, popularity=? where id=?;";
        // const str = `update course set name=${name} , university=${university}, url=${url}, difficulty=${difficulty} ,rate=${rate}, skills=${skills}, popularity=${popularity} where id=${};`;
        const connection = await database.getConnection();
        const result = await connection.query(str,[name,university,rate,url,difficulty,rate,skills, popularity, id], []);
        // const result = await connection.query(str);
        connection.release();
        return result;
    }
    async delete(id:number){
        const str = "update course set deleted = true where id = ?;";
        const connection = await database.getConnection();
        const result = await connection.query(str,[id], []);
        connection.release();
        return result;
    }
    async exist(id:number){
        const array = await this.find(id);
        return array.length > 0;
    }
}