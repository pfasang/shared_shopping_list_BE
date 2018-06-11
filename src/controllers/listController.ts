import {Item, List} from '../models';
import Bookshelf from '../database/bookshelf';
import * as Joi from 'joi';
import {listCreateInputValidation, listUpdateInputValidation} from "../utilities/validation/listValidation";
import dbConfig from "../database/dbConfig";

/***
 * Function to get all lists from table lists
 * @param req
 * @param res
 * @returns {Promise<void>} Returns all lists information in array of JSON's
 */
export const getAllLists = async (req, res) => {
    //get all lists from database
    const lists = await new List().where({owner_id: req.user.id}).orderBy(dbConfig.tables.list.params.title).fetchAll();

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
    const inputBody = req.body;
    inputBody.owner_id = req.user.id;
    //Validate list input
    const validatedBody = Joi.validate(inputBody, listCreateInputValidation);
    if (validatedBody.error) {
        return res.status(400).json();
    }

     //check if list exists in db
     const list = await new List().where({title: inputBody.title}).fetch();
     if(list) {
         return res.status(400).json();
     }

    //add list to database
    await Bookshelf.transaction(async (trx) => {
        const newList = await new List(inputBody).save(null, {method: "insert", transacting:trx, returning: "*"});
        return newList;
    });

    const listDat = await new List().where({title : inputBody.title}).fetch();
    if(!listDat) {
        return res.status(404).json();
    }

    return res.status(201).json(listDat);
};

/**
 * Function to update list in table lists
 * @param req
 * @param res
 * @returns {Promise<void>} Returns updated list information in JSON object
 */
export const updateList = async (req, res) => {
    const list = req.entity;

    //Validate list input
    const validatedBody = Joi.validate(req.body, listUpdateInputValidation);
    if (validatedBody.error) {
        return res.status(400).json();
    }

    //update list to database
    const updatedList = await Bookshelf.transaction(async (trx) => {
        const updatedList = await list.save(req.body, {method:"update", transacting:trx, returning: "*", patch: true});
        return updatedList;
    });
    return res.status(200).json(updatedList);
};

/**
 * Function to delete list from table lists
 * @param req
 * @param res
 * @returns {Promise<void>} Returns status code 204 in case of success
 */
export const deleteList = async (req, res) => {

    const list = req.entity;

    //delete list from database
    list.destroy();
    return res.status(204).json();
};

export const listAuthorPermission = async (req, res, next) => {
    //get id number from url
    const entityID = req.params.id;
    const userID = req.user.id;
    const entity = await new List().where({id : entityID}).fetch();
    if (!entity) {
        return res.status(404).json();
    }
    if (entity.attributes.owner_id != userID) {
        return res.status(403).json();
    }
    req.entity = entity;
    next();
};