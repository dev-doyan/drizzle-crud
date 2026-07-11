import { pgTable,integer,varchar, text,uuid} from "drizzle-orm/pg-core";
import authorTable from "./authorschema.js";


const bookTable=pgTable('books',{
    id:uuid().primaryKey().defaultRandom(),
    title:varchar({length:200}).notNull(),
    description:text(),
    authorId:uuid().references(()=>authorTable.id).notNull()
})

export default bookTable;