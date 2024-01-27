import * as dotenv from 'dotenv';
import * as mariadb from 'mariadb';
import * as path from "path";
import { PythonShell,Options } from "python-shell";
dotenv.config();


// const config:mariadb.PoolConfig = {
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_DBNAME,
//     port: Number(process.env.DATABASE_PORT),
//     connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT),
//     ssl:{rejectUnauthorized:false}
// }
// const database = mariadb.createPool(config);

// export default database;


export class MyDB{
    
    RECOMMEND_SYSTEM_LOCATION = path.join(process.env.RECOMMEND_SYSTEM_LOCATION);
    location:string = path.join(this.RECOMMEND_SYSTEM_LOCATION, "database_quaryer.py");
    constructor(){
        console.log("location", this.location);
    }
    async query(str : string, array?:any[], names?:any[]){

        if(array)str = this.replaceQuestionMark(str, array);
        console.log("qurey str=", str);
        let options:Options = {
            args:[String(str)],
        };
        let value_array = null;
        value_array = await new Promise((resolve, reject)=>{
            PythonShell.run(this.location, options, function(err, stdout) {
                if(err){
                    console.log(err);
                }else{
                    console.log("stdout=",stdout);
                    let obj = JSON.parse(stdout[0]);
                    resolve(obj);
                }
            });
        });
        let result = [];
        if(!names)return [];
        for(let i = 0;i<value_array.length;i++){
            let object = {};
            for(let j = 0;j<names.length;j++){
                object[names[j]] = value_array[i][j];
            }
            result.push(object);
        }
        console.log("result = ", result);
        return result;
        
    }
    async getConnection(){
        return this;
    }
    async release(){
        return;
    }
    replaceQuestionMark(inputString: string, replacementArray: string[]): string {
        // 使用正则表达式匹配字符串中的 ?
        const regex = /\?/g;
    
        // 使用 replace 方法替换匹配到的 ? 为数组中的对应元素
        const resultString = inputString.replace(regex, () => {
            // 如果数组中还有元素，则使用数组中的下一个元素替换 ?
            if (replacementArray.length > 0) {
                return replacementArray.shift()!;
            }
            // 如果数组中没有元素了，则保持原样
            return "?";
        });
    
        return resultString;
    }
    
}
const database = new MyDB();
export default database;





