const { object, string, number, date} =  require('yup');

exports.NewUserDto = object({
    body: object({
        Nom: string().required('First name is required'),
        Prenom: string().required('Last name is required'),
        Email: string().email().required('Email is required'),
        Password: string().min(8).max(20).required('Password is required'),
        Promotion: string().required('Promotion is required'),
        // phoneNumber: string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    }),
});
