import {integer,pgTable,text,varchar,uuid} from  "drizzle-orm/pg-core"

const authorTable=pgTable('authors',{
    id:uuid().primaryKey().defaultRandom(),
    name:varchar({length:300}),
    
})

export default authorTable;