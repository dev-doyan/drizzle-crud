import { authorTable } from "../models/authorschema";
import db from "../db/index.js";
import { eq } from "drizzle-orm";

//create
export const addauthor = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        const result = await db
            .insert(authorTable)
            .values({ name })
            .returning({ id: authorTable.id });

        return res.status(201).json(result);

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

//get authors
export const getauthor = async (req, res) => {
    try {
        const result = await db.select().from(authorTable);

        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

//delete
export const deleteauthor = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await db
            .delete(authorTable)
            .where(eq(authorTable.id, id)).returning({name:authorTable.name});

        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};