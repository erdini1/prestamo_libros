import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
    res.json("From user route")
})

export default router