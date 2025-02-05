import express from "express"
import cors from "cors"
import { env } from "./src/infrastructure/env"
import { createRouter } from "./src/infrastructure/route"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/v1",createRouter())


app.listen(env.PORT,()=>{
    console.log("port connected")
})