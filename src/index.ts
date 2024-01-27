import App from "./App";
import router from "./router";
import database from "./database/database";
import * as dotenv from 'dotenv';

const dns = require('dns');
dns.setDefaultResultOrder("ipv4first");


dotenv.config();

const port = process.env.PORT || 3000;
const app = new App(router).express;




app.listen(port, () => {
    console.log(`API is listening on http://localhost:${port}`);
});
