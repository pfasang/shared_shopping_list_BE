import * as express from 'express';
import {
    getAllItems
} from '../controllers/itemController';

/*import {
    getAllAreas,
    detailofArea,

} from '../controllers/areaController';*/

const router = express.Router();

router.get("/lists/:id/items", getAllItems);

export default router;