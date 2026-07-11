import { bookTable } from "../models/bookschema";
import db from "../db/index.js";
import { eq } from "drizzle-orm";

//create

export const createbook=async(req,res)=>{

    const{title,descrription,authorId}=req.body;
     if(!title || !authorId){
        return res.status(400).json({message:"missing details" });
     }

    const result =  await db.insert(bookTable).values({title,description,authorId}).returning({id:bookTable.id});//returning returns what u want to show
    return res.status(201).json({message:"book added"},result)

    
}

//read

export const getallbook=async(req,res)=>{
    const result=await db.select({
        id:bookTable.id,
        title:bookTable.title
    }).from(bookTable);
    res.status(200).json(result)
}

//read byid

export const getbookbyid=async(req,res)=>{
const id=req.params.id;
const bid=Number(id)

if(isNaN(bid)){
    return res.status(400).json({message:"invalid id "})
}
    const result=await db.select({title:bookTable.title}).from(bookTable).where(eq(bookTable.id,bid));
    res.status(200).json(result[0]);

}


//delete

export const deletebook=async(req,res)=>{
    const id=req.params.id;

    const bid=Number(id)

if(isNaN(bid)){
    return res.status(400).json({message:"invalid id "})
}
const result = await db.delete(bookTable).where(eq(bookTable.id,bid)).returning({deletednook:bookTable.title});
res.json(result[0]);



}

//upddate


export const updatebook=async(req,res)=>{

    const id=req.params.id;
    const{title,description}=req.body;
const bid=Number(id)

if(isNaN(bid)){
    return res.status(400).json({message:"invalid id "})
}

const result=await db.update(bookTable).set({title,description}).returning({id: bookTable.id,
    title: bookTable.title,})

    return res.status(200).json(result);

}
