import express from "express"
import "dotenv/config"

import indexRouter from "./src/routes/index.route.js"

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// Indico el prefijo de la api
const API_ENDPOINT = process.env.API_ENDPOINT
app.use(API_ENDPOINT, indexRouter)