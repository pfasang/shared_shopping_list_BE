import {Item} from '../models';
import Bookshelf from '../database/bookshelf';
import * as Joi from 'joi';
import {itemCreateInputValidation} from "../utilities/validation/itemValidation";
import dbConfig from "../database/dbConfig";
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
    const items = await new Item().where({list_id : listID}).orderBy(dbConfig.tables.item.params.name).fetchAll();

    if(!items) {
        return res.status(404).json();
    }
    return res.status(200).json(items);
};

/**
 * Function to create new item in table items
 * @param req
 * @param res
 * @returns {Promise<void>} Returns item information in JSON object
 */
export const createItem = async (req, res) => {

    //Validate item input
    const validatedBody = Joi.validate(req.body, itemCreateInputValidation);
    if (validatedBody.error) {
        return res.status(400).json();
    }
    //check if is email in use
    const inputName = req.body.name;
    const inputListID = req.body.list_id;
    const item = await new Item().where({name : inputName, list_id: inputListID}).fetch();
    if(item) {
        return res.status(400).json();
    }

    //add item to database
    await Bookshelf.transaction(async (trx) => {
        const newItem = await new Item(req.body).save(null, {method: "insert", transacting:trx, returning: "*"});
        return newItem;
    });

    const itemDat = await new Item().where({name : inputName,list_id: inputListID}).fetch();
    if(!itemDat) {
        return res.status(404).json();
    }

    return res.status(201).json(itemDat);
};

/**
 * Function to update item in table items
 * @param req
 * @param res
 * @returns {Promise<void>} Returns updated item information in JSON object
 */
export const updateItem = async (req, res) => {
    //get id number from url
    const itemID = req.params.id;

    //get item with given ID
    const item = await new Item().where({id : itemID}).fetch();
    if(!item) {
        return res.status(404).json();
    }

    //Validate item input
    const validatedBody = Joi.validate(req.body, itemCreateInputValidation);
    if (validatedBody.error) {
        return res.status(400).json();
    }

    //update item to database
    const updatedItem = await Bookshelf.transaction(async (trx) => {
        const updatedItem = await item.save(req.body, {method:"update", transacting:trx, returning: "*", patch: true});
        return updatedItem;
    });
    return res.status(200).json(updatedItem);
};

/**
 * Function to delete item from table items
 * @param req
 * @param res
 * @returns {Promise<void>} Returns status code 204 in case of success
 */
export const deleteItem = async (req, res) => {

    //get id number from url
    const itemID = req.params.id;

    //get item with given ID
    const item = await new Item().where({id : itemID}).fetch();
    if (!item) {
        return res.status(404).json();
    }

    //delete item from database
    item.destroy();
    return res.status(204).json();

};