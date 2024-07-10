import joi from "joi";

export const userSchema = joi.object ({
    user:{
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    otherNames: joi.string(),
    email: joi.string().email().required(),
    password : joi.string().min(4).max(50).required(),
    confirmPassword: joi.ref('password'),
    termsAndConditions: joi.boolean(),

}
})