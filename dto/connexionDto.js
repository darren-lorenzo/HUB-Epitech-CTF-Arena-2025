const { object, string, number, date, InferType } = require('yup');

exports.connexionDto = object({
    body: object({
        Email: string().email().required('Email is required'),
        Password: string().min(8).max(20).required('Password is required'),
    }),
});