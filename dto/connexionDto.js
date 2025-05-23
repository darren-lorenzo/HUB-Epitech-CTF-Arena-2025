const { object, string, number, date, InferType } = require('yup');

exports.connexionDto = object({
    body: object({
        email: string().email().required('Email is required'),
        password: string().min(8).max(20).required('Password is required'),
    }),
});