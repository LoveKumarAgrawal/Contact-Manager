import {Request, Response} from "express"
import { ApiError } from "../utils/errorHandler";
import { asyncHandler } from "../utils/asyncHandler";
// @desc  Get all contacts
// @route  GET /api/contacts
// @access public

export const getAllContacts = asyncHandler( async (req: Request, res: Response) => {
    res.status(200).json({
        message: "Get all contacts"
    })
} )

// @desc  create new contact
// @route POST /api/contacts
// @access public
export const createContact = asyncHandler( async (req: Request, res: Response) => {
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        throw new ApiError(400, "All fields are mandatory")
    }
    
    res.status(200).json({
        message: "Contract Created Successfully"
    })
} )

// @desc  Get contact
// @route GET /api/contacts/:id
// @access public
export const getContact = asyncHandler( async (req: Request, res: Response) => {
    res.status(200).json({
        message: `Return contact with id ${req.params.id}`
    })
} )

// @desc  Update contact
// @route PUT /api/contacts/:id
// @access public
export const updateContact = asyncHandler( async (req: Request, res: Response) => {
    res.status(200).json({
        message: `Update contact with id ${req.params.id}`
    })
} )

// @desc  Delete contact
// @route DELETE /api/contacts/:id
// @access public
export const deleteContact = asyncHandler( async (req: Request, res: Response) => {
    res.status(200).json({
        message: `Delete contact with id ${req.params.id}`
    })
} )