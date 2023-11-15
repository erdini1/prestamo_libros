import Joi from "@hapi/joi"
import { Schemas } from "./schema.js"

export const schemaUser = {
    create: Joi.object().keys({
        name: Schemas.String,
        lastName: Schemas.String,
        email: Schemas.Email,
        password: Schemas.Password,
    }),
    login: Joi.object().keys({
        email: Schemas.Email,
        password: Schemas.Password
    })
}