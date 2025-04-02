import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .max(100, 'Email must not exceed 100 characters'),
  
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .test('len', 'Phone number must be exactly 10 digits', val => val.length === 10),
  
  gender: Yup.string()
    .required('Please select a gender option'),


  radio: Yup.string()
    .required('Please select an option'),
  
  dropdown: Yup.string()
    .required('Please select a dropdown option'),
  
  checkbox: Yup.boolean()
    .oneOf([true], 'Checkbox must be checked'),

    'company-logo': Yup.mixed()
    .nullable()
    .test('fileSize', 'File is too large', value => 
      !value || value.size <= 5 * 1024 * 1024
    )
    .test('fileType', 'Unsupported file type', value => 
      !value || ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
    ),
    
  'image-footer': Yup.mixed()
    .nullable()
    .test('fileSize', 'File is too large', value => 
      !value || value.size <= 5 * 1024 * 1024
    )
    .test('fileType', 'Unsupported file type', value => 
      !value || ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
    ),
    
  'image-header': Yup.mixed()
    .nullable()
    .test('fileSize', 'File is too large', value => 
      !value || value.size <= 5 * 1024 * 1024
    )
    .test('fileType', 'Unsupported file type', value => 
      !value || ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
    )
});

export const initialValues = {
  name: '',
  email: '',
  phone: '',
  gender: '',
  radio: '',
  dropdown: '',
  checkbox: false,
  'company-logo': null,
  'image-footer': null,
  'image-header': null
};