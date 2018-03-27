import * as express from 'express';
import {
    createItem,
    updateItem,
    deleteItem
} from "../controllers/itemController";

const router = express.Router();
router.post("/items", createItem);
router.patch("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

export default router;