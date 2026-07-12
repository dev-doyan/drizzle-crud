import express from "express"
const router =express.Router();

import { addauthor, getauthor,deleteauthor} from "../controllers/authorcontroller.js";
router.get("/",getauthor);
router.post("/add",addauthor);
router.delete("/delete/:id",deleteauthor);


export default router;
