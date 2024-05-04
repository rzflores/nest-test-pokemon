import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
    MONGO_URL :Joi.required(),
    PORT : Joi.required().default(3000),
    DEFAULT_LIMIT : Joi.required().default(5)
})