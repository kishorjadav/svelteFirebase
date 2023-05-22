import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    email: yup.string().email().label('Email').required(),
    password: yup
        .string()
        .label('Password')
        .min(8, 'Password must be 8 alphanumeric characters')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            'Must be atleast 1 uppercase, 1 lowercase & 1 numeric letter'
        ).required(),
    // confirm_password: yup
    //     .string()
    //     .label('confirm password')
    //     .required()
    //     .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const RegisterSchema = yup.object().shape({
    email: yup.string().email().label('Email').required(),
    password: yup
        .string()
        .label('Password')
        .min(8, 'Password must be 8 alphanumeric characters')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            'Must be atleast 1 uppercase, 1 lowercase & 1 numeric letter'
        ).required(),
    confirmPassword: yup
        .string()
        .label('confirm password')
        .required()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const forgotSchema = yup.object().shape({
    email: yup.string().email().label('Email').required(),

});


export const ResetPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .label('Password')
        .min(8, 'Password must be 8 alphanumeric characters')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            'Must be atleast 1 uppercase, 1 lowercase & 1 numeric letter'
        ).required(),
    confirmPassword: yup
        .string()
        .label('confirm password')
        .required()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const customerSchema = yup.object().shape({
    email: yup.string().email().label('Email').required(),
    firstName: yup.string().label('First Name').required(),
    phone: yup
        .number()
        .typeError('Please enter a valid mobile number')
        .label('Mobile Number')
        .required(),
    sdate: yup.string().label('Start date').required(),
    edate: yup.string().label('End date').required(),
});
