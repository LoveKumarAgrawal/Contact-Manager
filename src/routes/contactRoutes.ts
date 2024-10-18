import express from "express"
import { getAllContacts, getContact, createContact, deleteContact, updateContact } from "../controllers/contactController"

const contactRouter = express.Router()

contactRouter.route("/").get(getAllContacts).post(createContact)

contactRouter.route("/:id").get(getContact)

contactRouter.route("/:id").put(updateContact)

contactRouter.route("/:id").delete(deleteContact)

export { contactRouter }