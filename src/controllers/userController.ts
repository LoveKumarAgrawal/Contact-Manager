import {Request, Response} from "express"
import { ApiError } from "../utils/errorHandler";
import { asyncHandler } from "../utils/asyncHandler";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();



// @desc  Register user
// @route  POST /api/users
// @access public

export const registerUser = asyncHandler( async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if(!username||!email||!password) {
        throw new ApiError(400, "All fields are mandatory")
    }
    const userAvailable = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if(userAvailable) {
        throw new ApiError(400, "User already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    })
    if(user) {
        res.status(201).json({ 
            id: user.id,
            email: user.email
        })
    } else {
        throw new ApiError(400, "User data is not valid")
    }
} )

// @desc   Login user
// @route  POST /api/users
// @access public

export const loginUser = asyncHandler( async (req: Request, res: Response) => {
    const { email, password } = req.body
    if(!email||!password) {
        throw new ApiError(400, "All fields are mandatory")
    }
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET ?? "",
        {expiresIn: "1m"}
        )
        res.status(200).json({ accessToken })
    } else {
        throw new ApiError(401, "Email or password is not valid")
    }
} )

// @desc   Current user information
// @route  GET /api/users
// @access private

export const currentUser = asyncHandler( async (req: Request, res: Response) => {
    res.json({
        message: "Current User Information"
    })
} )
