import express from "express"
import { getAllContacts, getContact, createContact, deleteContact, updateContact } from "../controllers/contactController"
import { validateToken } from "../middleware/validateTokenHandler"

const contactRouter = express.Router()

contactRouter.use(validateToken)
contactRouter.route("/").get(getAllContacts).post(createContact)

contactRouter.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

export { contactRouter }