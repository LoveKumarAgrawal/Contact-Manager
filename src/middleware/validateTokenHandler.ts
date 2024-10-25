import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express"
import { ApiError } from "../utils/errorHandler";

export const validateToken = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    let token
    const authHeader: any = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err: any, decoded: any) => {
            if(err) {
                throw new ApiError(401, "User is not authorized")
            }
            // @ts-ignore
            req.user = decoded.user
            next()
        })
        if(!token) {
            throw new ApiError(401, "User is not authorized or token is missing")
        }
    }
})
