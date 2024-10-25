import express from "express"
import { currentUser, loginUser, registerUser } from "../controllers/userController"
import { validateToken } from "../middleware/validateTokenHandler"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/current", validateToken, currentUser)


export { userRouter }