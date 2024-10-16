import {Request, Response} from "express"
import { ApiError } from "../utils/errorHandler";
import { asyncHandler } from "../utils/asyncHandler";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
// @desc  Get all contacts
// @route  GET /api/contacts
// @access public

export const getAllContacts = asyncHandler( async (req: Request, res: Response) => {
    try {
        const allContacts = await prisma.contact.findMany({})
        return res.status(200).json({
            message: "Get all contacts",
            contacts: allContacts
        })
    } catch (error) {
        throw new ApiError(500,  "Internal server error")
    }  
} )

// @desc  create new contact
// @route POST /api/contacts
// @access public
export const createContact = asyncHandler( async (req: Request, res: Response) => {
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        throw new ApiError(400, "All fields are mandatory")
    }
    const newContact = await prisma.contact.create({
        data: {
            name,
            email,
            phone
        },
    })
    if(!newContact) {
        throw new ApiError(500, "Unable to create the contact")
    }
    return res.status(201).json({
        message: "Contract Created Successfully"
    })
} )

// @desc  Get contact
// @route GET /api/contacts/:id
// @access public
export const getContact = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params; // Destructure id directly
    if (!id) {
        throw new ApiError(400, "Id is required");
    }
    
    const contact = await prisma.contact.findUnique({
        where: { id },
    });
    if (!contact) {
        throw new ApiError(404, "Contact not found");
    }
    return res.status(200).json({
        message: "Contact retrieved successfully",
        contact,
    });
});

// @desc  Update contact
// @route PUT /api/contacts/:id
// @access public
export const updateContact = asyncHandler( async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        throw new ApiError(400, "All fields are mandatory")
    }
    if(!id) {
        throw new ApiError(400, "Id is required")
    }
    const updatedContact = await prisma.contact.update({
        where: {
            id
        },
        data: {
            name,
            email,
            phone
        }
    })
    if(!updatedContact) {
        throw new ApiError(500, "Contact cannot be updated")
    }
    return res.status(200).json({
        message: `Contact updated with id ${req.params.id}`,
        contact: updatedContact
    })
} )

// @desc  Delete contact
// @route DELETE /api/contacts/:id
// @access public
export const deleteContact = asyncHandler( async (req: Request, res: Response) => {
    const id = req.params.id;
    if(!id) {
        throw new ApiError(400, "Id is required")
    }
    const deletedContact = await prisma.contact.delete({
        where: {
            id
        }
    })
    if(!deletedContact) {
        throw new ApiError(500, "Contact not deleted")
    }
    return res.status(200).json({
        message: `Delete contact with id ${req.params.id}`
    })
} )