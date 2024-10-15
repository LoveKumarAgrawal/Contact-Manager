import express,{ Request, Response } from "express"
import { getAllContacts, getContact, createContact, deleteContact, updateContact } from "../controllers/contactController"

const router = express.Router()

router.route("/").get(getAllContacts).post(createContact)

router.route("/:id").get(getContact)

router.route("/:id").put(updateContact)

router.route("/:id").delete(deleteContact)

export { router }