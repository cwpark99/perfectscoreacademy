import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { MongoClient } from "mongodb";
const connectionString = process.env.MONGODB_URI || "";
const client = new MongoClient(connectionString);
let conn;
try {
    conn = await client.connect();
}
catch (e) {
    console.error(e);
    console.log(`\n\nYou must set the ATLAS_URI environment variable in the .env file`);
}
let students = conn.db("students");
let teachers = conn.db("teachers");
let classes = conn.db("classes");
export default students;
export { teachers, classes };
//# sourceMappingURL=index.js.map