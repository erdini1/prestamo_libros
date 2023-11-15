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
    }),
    update: Joi.object().keys({
        body: {
            name: Schemas.StringUpdate,
            lastName: Schemas.StringUpdate,
            email: Schemas.EmailUpdate,
            password: Schemas.PasswordUpdate,
        },
        id: Schemas.Id,
    })

}