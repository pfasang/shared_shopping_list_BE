import {Item, List} from '../models';
import Bookshelf from '../database/bookshelf';
import * as Joi from 'joi';
import {listCreateInputValidation} from "../utilities/validation/listValidation";
import dbConfig from "../database/dbConfig";
/***
 * Function to get all lists from table lists
 * @param req
 * @param res
 * @returns {Promise<void>} Returns all lists information in array of JSON's
 */
export const getAllLists = async (req, res) => {
    //get list id number from url
    const listID = req.params.id;
    //get all lists from database
    const lists = await new List().orderBy(dbConfig.tables.list.params.title).fetchAll();

    if(!lists) {
        return res.status(404).json();
    }
    return res.status(200).json(lists);
};