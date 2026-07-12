import express from "express";
const router=express.Router();

import { createbook ,getallbook, getbookbyid,deletebook,updatebook  } from "../controllers/bookcontroller.js";


router.get("/",getallbook);
router.post("/add",createbook);
router.get("/:id", getbookbyid);
router.delete("/delete/:id",deletebook);
router.put("/update/:id",updatebook);

export default  router ;