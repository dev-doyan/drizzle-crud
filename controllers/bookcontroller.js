import bookTable  from "../models/bookschema.js";
import db from "../db/index.js";
import { eq ,sql} from "drizzle-orm";

//create

export const createbook = async (req, res) => {
    try {
        const { title, description, authorId } = req.body;

        if (!title || !authorId) {
            return res.status(400).json({ message: "missing details" });
        }

        const result = await db
            .insert(bookTable)
            .values({ title, description, authorId })
            .returning({ id: bookTable.id });

        return res.status(201).json({ message: "book added", result });

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

//read

export const getallbook = async (req, res) => {
    try {
const {title}=req.query;
if(title){
    const books= await db.select({id:bookTable.id,title:bookTable.title}).from(bookTable).where(sql`to_tsvector('english', ${bookTable.title}) @@ to_tsquery('english', ${title})`);
    return res.status(200).json(books)
}



        const result = await db
            .select({
                id: bookTable.id,
                title: bookTable.title,    //check foreign key and join implementation 
            })
            .from(bookTable);

        res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

//read byid

export const getbookbyid = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await db
            .select({ title: bookTable.title })
            .from(bookTable)
            .where(eq(bookTable.id, id));

        res.status(200).json(result[0]);

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

//delete

export const deletebook = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Deleting ID:", id);

        const result = await db
            .delete(bookTable)
            .where(eq(bookTable.id, id))
            .returning({ deletedBook: bookTable.title });

        console.log(result);

        res.json(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

//update

export const updatebook = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;

        const result = await db
            .update(bookTable)
            .set({ title, description })
            .where(eq(bookTable.id, id))
            .returning({
                id: bookTable.id,
                title: bookTable.title,
            });

        return res.status(200).json(result[0]);

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};