import express from 'express';
import 'dotenv/config'
import { router } from "./routes/contactRoutes"

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use("/api/contacts", router);


app.listen(port, () => {
    console.log("server is listening")
})