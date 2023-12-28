import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody, isEmptyBodyFavorite, isValidId, authenticate } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import { contactPostSchema, contactPutSchema, contactPatchSchema } from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, contactsController.getAll);

contactsRouter.get('/:contactId', authenticate, isValidId, contactsController.getById);

contactsRouter.post('/', authenticate, isEmptyBody, validateBody(contactPostSchema), contactsController.add);

contactsRouter.put('/:contactId', authenticate, isValidId, isEmptyBody, validateBody(contactPutSchema), contactsController.updateById);

contactsRouter.patch("/:contactId/favorite", authenticate, isValidId, isEmptyBodyFavorite, validateBody(contactPatchSchema), contactsController.updateStatusContact);

contactsRouter.delete('/:contactId', authenticate, isValidId, contactsController.deleteById);

export default contactsRouter;
