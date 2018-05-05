import * as express from 'express';
import {
    getAllItems
} from '../controllers/itemController';
import {
    getAllLists
} from '../controllers/listController';



const router = express.Router();

router.get("/lists/:id/items", getAllItems);
router.get("/lists", getAllLists);

export default router;