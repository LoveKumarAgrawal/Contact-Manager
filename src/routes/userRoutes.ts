import express from "express"
import { currentUser, loginUser, registerUser } from "../controllers/userController"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/current", currentUser)


export { userRouter }