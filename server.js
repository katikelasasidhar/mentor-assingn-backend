const express=require('express');
const app=express();
app.use(express.json());
const {MongoClient}=require('mongodb');
const dotenv=require('dotenv');
dotenv.config();
async function createconnection(){
    let client=new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    console.log("Mongodb Connected");
    return client;

}

app.post('/creatementor',async (req,res)=>{
    try{
          const client = await createconnection();
          const mentor=await client
          .db("mentor-assign")
          .collection("mentor")
          .insertOne(req.body);
          res.json({message:"created successfully"
        })

    }
    catch(error){
       console.log(error);
       res.status(400)
    }
})
app.post('/createstudent',async (req,res)=>{
    try{
   const client=await createconnection();
   const student=await client
                      .db("mentor-assign")
                      .collection("student")
                      .insertOne(req.body);
                      
res.json({
    status:"successful",
    message:"successfully created"
})  
    }
    catch(err){
        console.log(err);
        res.status(400)
    }              
})
app.get("/getmentors",async (req,res)=>{
    try{
        const client = await createconnection();
        let mentors = await client
                         .db("mentor-assign")
                         .collection("mentor") 
                         .find({})
                         .toArray()    ; 

       res.send(mentors)
    }
    catch(err){
      console.log(err);
      res.json({
          message:"something went wrong"
      })
    }
})
app.get("/getstudents",async (req,res)=>{
    try{
        const client = await createconnection();
        let students = await client
                         .db("mentor-assign")
                         .collection("student") 
                         .find({})
                         .toArray()    ; 

       res.send(students)
    }
    catch(err){
      console.log(err);
      res.json({
          message:"something went wrong"
      })
    }
})










app.listen(process.env.PORT|| 5000,()=>{
    console.log("server is running")
})
