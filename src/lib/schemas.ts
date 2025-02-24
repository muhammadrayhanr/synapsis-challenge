import * as yup from 'yup';

export const createPostSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters'),
  body: yup
    .string()
    .required('Content is required')
    .min(10, 'Content must be at least 10 characters'),
});

export const createUserSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Invalid email format')
    .required('Email is required'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Invalid gender selection')
    .required('Gender is required'),
  status: yup
    .string()
    .oneOf(['active', 'inactive'], 'Invalid status selection')
    .required('Status is required'),
});

export const editUserSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Invalid email format')
    .required('Email is required'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Invalid gender selection')
    .required('Gender is required'),
  status: yup
    .string()
    .oneOf(['active', 'inactive'], 'Invalid status selection')
    .required('Status is required'),
});

export const commentSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    email: yup
    .string()
    .trim()
    .email('Invalid email format')
    .required('Email is required'),
    body: yup
    .string()
    .required('Comment is required')
    .min(10, 'Comment must be at least 10 characters'),
});
