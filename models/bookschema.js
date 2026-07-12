import { pgTable,integer,varchar, text,uuid,index} from "drizzle-orm/pg-core";
import authorTable from "./authorschema.js";
import {sql} from "drizzle-orm";


const bookTable=pgTable('books',{
    id:uuid().primaryKey().defaultRandom(),
    title:varchar({length:200}).notNull(),
    description:text(),
    authorId:uuid().references(()=>authorTable.id).notNull()
},(table)=>({
    titleIndex: index('title_ind').using("gin",sql`to_tsvector('english',${table.title})`)
}
))

export default bookTable;