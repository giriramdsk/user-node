const Joi = require('joi');

const signupSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': 'First Name is required'
    }),
    lastName: Joi.string().required().messages({
        'string.empty': 'Last Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Valid Email is required',
        'string.empty': 'Email is required'
    }),
    mobile: Joi.string().pattern(/^\d{10}$/).required().messages({
        'string.pattern.base': 'Mobile No must be exactly 10 digits long',
        'string.empty': 'Mobile No is required'
    }),
    role: Joi.string().valid('User', 'Admin', 'Guest').required().messages({
        'any.only': 'Role must be one of User, Admin, or Guest',
        'string.empty': 'Role is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required'
    })
});


const validateSignup = (req, res, next) => {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => ({
            field: err.path[0],
            message: err.message
        }));
        return res.status(400).json({ message: 'Validation failed', errors });
    }
    next();
};

module.exports = {
    validateSignup
};
