import Joi from "@hapi/joi"
import { Schemas } from "./schema.js"

export const schemaBook = {
    create: Joi.object().keys({
        title: Schemas.String,
        author: Schemas.String,
        genre: Schemas.String,
        pages: Schemas.Pages,
        summary: Schemas.Summary,
    }),
    update: Joi.object().keys({
        body: {
            title: Schemas.StringUpdate,
            author: Schemas.StringUpdate,
            genre: Schemas.StringUpdate,
            pages: Schemas.PagesUpdate,
            summary: Schemas.SummaryUpdate,
        },
        id: Schemas.Id,
    }),
}