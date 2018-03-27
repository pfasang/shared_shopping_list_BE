import {Item} from '../models';
import Bookshelf from '../database/bookshelf';
import * as Joi from 'joi';
//import {itemCreateInputValidation} from "../utilities/validation/itemValidation";
/***
 * Function to get all items from table items
 * @param req
 * @param res
 * @returns {Promise<void>} Returns all items information in array of JSON's
 */
export const getAllItems = async (req, res) => {
    //get list id number from url
    const listID = req.params.id;
    //get all items from database
    const items = await new Item().where({list_id : listID}).fetchAll();

    if(!items) {
        return res.status(404).json();
    }
    return res.status(200).json(items);
};