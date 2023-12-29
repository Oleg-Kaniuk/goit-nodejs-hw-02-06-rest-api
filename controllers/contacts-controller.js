import Contact from "../models/Contact.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";


const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  const condition = { owner };
    if (favorite !== null) {
        condition.favorite = favorite;
    }
  const result = await Contact.find(condition, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription");
  res.json(result);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOne({ owner, _id: contactId });
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate({ owner, _id: contactId }, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate({ owner, _id: contactId }, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({ owner, _id: contactId });
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    message: "contact deleted",
  });
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteById: ctrlWrapper(deleteById),
}