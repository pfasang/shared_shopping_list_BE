import * as Joi from 'joi'

export const itemTestOutput = Joi.object().keys({
    id: Joi.number().integer().required(),
    name: Joi.string().regex(/^[a-zA-Z0-9_-]{3,30}$/).required(),
    list_id: Joi.number().integer().required().min(1),
    isBought: Joi.boolean().required(),
    count: Joi.number().integer().required().min(1),
    createdAt: Joi.string().required(),
    modifiedAt: Joi.string().required()
});

export const itemListTestOutput = Joi.array().items(itemTestOutput);

export const itemCreateInputValidation = Joi.object().keys({
    name: Joi.string().regex(/^[a-zA-Z0-9_-]{3,30}$/).required(),
    list_id: Joi.number().integer().required().min(1),
    count: Joi.number().integer().min(1),
    isBought: Joi.boolean(),
});