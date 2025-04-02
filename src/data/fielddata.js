export const initialFields = [
  { id: 'name', type: 'text', dataType: 'string', controlType: 'textbox', label: 'Name' },
  { id: 'email', type: 'email', dataType: 'string', controlType: 'email', label: 'Email' },
  { id: 'phone', type: 'text', dataType: 'string', controlType: 'textbox', label: 'Phone' },
  { id: 'radio', type: 'radio', dataType: 'string', controlType: 'radiobutton', label: 'Radio', options: ['Option 1', 'Option 2'] },
  { id: 'dropdown', type: 'dropdown', dataType: 'string', controlType: 'select', label: 'Dropdown', options: ['Option 1', 'Option 2', 'Option 3'] },
  { id: 'checkbox', type: 'checkbox', dataType: 'boolean', controlType: 'checkbox', label: 'Checkbox' }
];

export const dataFields = [
  { id: 'company-logo', type: 'image', dataType: 'binary', controlType: 'fileupload', label: 'Company Logo' },
  { id: 'image-footer', type: 'image', dataType: 'binary', controlType: 'fileupload', label: 'Image Footer' },
  { id: 'image-header', type: 'image', dataType: 'binary', controlType: 'fileupload', label: 'Image Header' }
];

export const customFields = [
  { id: 'text', type: 'text', dataType: 'string', controlType: 'textbox', label: 'Text Input' },
  
  { id: 'number', type: 'number', dataType: 'number', controlType: 'numberbox', label: 'Number Input' },
  
  { id: 'textarea', type: 'textarea', dataType: 'string', controlType: 'multilinetext', label: 'Textarea' },
  
  { id: 'checkbox', type: 'checkbox', dataType: 'boolean', controlType: 'checkbox', label: 'Checkbox' },
  
  { id: 'checkboxes', type: 'checkbox', dataType: 'array', controlType: 'checkboxgroup', label: 'Checkboxes', options: ['Option 1', 'Option 2', 'Option 3'] },
  
  { id: 'radio', type: 'radio', dataType: 'string', controlType: 'radiobutton', label: 'Radio Button', options: ['Option 1', 'Option 2'] },
  
  { id: 'dropdown', type: 'dropdown', dataType: 'string', controlType: 'select', label: 'Dropdown', options: ['Option 1', 'Option 2', 'Option 3'] },
  
  { id: 'date', type: 'date', dataType: 'date', controlType: 'datepicker', label: 'Date Input' },
  
  { id: 'file', type: 'file', dataType: 'binary', controlType: 'fileupload', label: 'File Upload' }
];