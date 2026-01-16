
import express from "express"
import { createClient } from "redis"

const client = createClient();
const app = express();
app.use(express.json());

app.post("/submit", async (req,res)=>{
    const problemId = req.body.problemId;
    const userId = req.body.userId;
    const code = req.body.code;
    const language = req.body.language;

    try{
        await client.lPush("Submissions",JSON.stringify({problemId,userId,code,language}));
        // also push to db
        res.status(200).send("Submission recieved and stored");
    }
    catch(e){
        console.log("Redis error",e);
        res.status(500).send("Failed to store submissions.");
    }
})

async function startServer(){
    try{
        await client.connect();
        console.log("Connected to redis");
        
        app.listen(3000,()=>{
            console.log("Server is running on port 3000");
        })
    }
    catch(error){
        console.log("Failed to connect with redis",error);
    }
}
startServer();