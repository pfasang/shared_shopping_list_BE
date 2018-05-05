import * as Joi from 'joi'
export const listTestOutput = Joi.object().keys({
    id: Joi.number().integer().required(),
    title: Joi.string().regex(/^[ a-zA-Z0-9_-]{3,30}$/).required(),
    owner_id: Joi.number().integer().required().min(1),
    createdAt: Joi.string().required(),
    modifiedAt: Joi.string().required()
});
export const listListTestOutput = Joi.array().items(listTestOutput);
export const listCreateInputValidation = Joi.object().keys({
    title: Joi.string().regex(/^[ a-zA-Z0-9_-]{3,30}$/).required(),
    owner_id: Joi.number().integer().required().min(1),
});