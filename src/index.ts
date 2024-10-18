import express from 'express';
import 'dotenv/config'
import { contactRouter } from "./routes/contactRoutes"
import { userRouter } from './routes/userRoutes';

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);


app.listen(port, () => {
    console.log("server is listening")
})