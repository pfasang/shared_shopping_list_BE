import * as express from 'express';
import {
    getAllItems
} from '../controllers/itemController';
import {
    createList,
    getAllLists
} from '../controllers/listController';



const router = express.Router();

router.get("/lists/:id/items", getAllItems);
router.get("/lists", getAllLists);
router.post("/lists", createList);

export default router;