import express from "express"
const app=express();
import bookRouter from "./routes/bookRouter.js"
import authorRouter from "./routes/authorRouter.js"


import dotenv from "dotenv"
dotenv.config();


//middlewears
app.use(express.json());
app.use('/books',bookRouter);
app.use("/authors",authorRouter)



app.listen(3000,()=>{
    console.log("server running on port 3000 ");

})
