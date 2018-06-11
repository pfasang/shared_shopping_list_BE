import * as express from 'express';
import {
    getAllItems
} from '../controllers/itemController';
import {
    createList,
    getAllLists,
    updateList,
    deleteList, listAuthorPermission
} from '../controllers/listController';



const router = express.Router();

router.get("/lists/:id/items", getAllItems);
router.get("/lists", getAllLists);
router.post("/lists", createList);
router.patch("/lists/:id",listAuthorPermission, updateList);
router.delete("/lists/:id",listAuthorPermission, deleteList);

export default router;