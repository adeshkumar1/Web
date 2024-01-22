import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"
import "dotenv/config"


const MongoClient = mongodb.MongoClient;
const mongo_username = process.env.MONGOUSERNAME;
const mongo_password = process.env.MONGOPASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.2ip9rlg.mongodb.net/?retryWrites=true&w=majority`;
const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    })


