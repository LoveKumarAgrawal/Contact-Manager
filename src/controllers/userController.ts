import {Request, Response} from "express"
import { ApiError } from "../utils/errorHandler";
import { asyncHandler } from "../utils/asyncHandler";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();



// @desc  Register user
// @route  Post /api/users
// @access public

export const registerUser = asyncHandler( async (req: Request, res: Response) => {
    res.json({
        message: "Register the user"
    })
} )

// @desc   Login user
// @route  post /api/users
// @access public

export const loginUser = asyncHandler( async (req: Request, res: Response) => {
    res.json({
        message: "Login the user"
    })
} )

// @desc   Current user information
// @route  get /api/users
// @access private

export const currentUser = asyncHandler( async (req: Request, res: Response) => {
    res.json({
        message: "Current User Information"
    })
} )
