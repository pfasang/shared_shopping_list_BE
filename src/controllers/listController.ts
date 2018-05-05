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
    //get all lists from database
    const lists = await new List().orderBy(dbConfig.tables.list.params.title).fetchAll();

    if(!lists) {
        return res.status(404).json();
    }
    return res.status(200).json(lists);
};

/**
 * Function to create new list in table lists
 * @param req
 * @param res
 * @returns {Promise<void>} Returns list information in JSON object
 */
export const createList = async (req, res) => {
    const inputTitle = req.body.title;

    //Validate list input
    const validatedBody = Joi.validate(req.body, listCreateInputValidation);
    if (validatedBody.error) {
        return res.status(400).json();
    }

     //check if list exists in db
     const list = await new List().where({title: inputTitle}).fetch();
     if(list) {
         return res.status(400).json();
     }

    //add list to database
    await Bookshelf.transaction(async (trx) => {
        const newList = await new List(req.body).save(null, {method: "insert", transacting:trx, returning: "*"});
        return newList;
    });

    const listDat = await new List().where({title : inputTitle}).fetch();
    if(!listDat) {
        return res.status(404).json();
    }

    return res.status(201).json(listDat);
};
