import {Schema, model} from "mongoose";
import Joi from "joi";

import { handleSaveError, addUpdateSettings } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        // required: [true, 'Verify token is required'],
    },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", addUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
    password: Joi.string().min(6).required().messages({ "any.required": "missing required password field"}),
    email: Joi.string().pattern(emailRegexp).required().messages({ "any.required": "missing required email field"}),
    subscription: Joi.string(),
});

export const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({ "any.required": "missing required field email"}),
})

export const userSigninSchema = Joi.object({
    password: Joi.string().min(6).required().messages({ "any.required": "missing required password field"}),
    email: Joi.string().pattern(emailRegexp).required().messages({ "any.required": "missing required email field"}),
});

export const userSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required()
});

const User = model("user", userSchema);

export default User;