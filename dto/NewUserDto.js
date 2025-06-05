const { object, string, number, date} =  require('yup');

exports.NewUserDto = object({
    body: object({
        Nom: string().required('First name is required'),
        Prenom: string().required('Last name is required'),
        Email: string().email().required('Email is required'),
        Password: string().min(8).max(20).required('Password is required'),
        Alias: string().required('Alias is required'),
    }),
});
