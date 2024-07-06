// Import the necessary dependencies
import React from 'react' // Import React
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form' // Import components from the form library
import { Input } from './ui/input' // Import the Input component from the ui library

import { Control, FieldPath } from 'react-hook-form' // Import the Control and FieldPath types from react-hook-form
import { z } from 'zod' // Import zod for schema validation
import { authFormSchema } from '@/lib/utils' // Import the authFormSchema function from the utils library

// Define the form schema using the authFormSchema function
const formSchema = authFormSchema('sign-up')

// Define the CustomInput component props interface
interface CustomInput {
  control: Control<z.infer<typeof formSchema>>, // The control prop is of type Control from react-hook-form and is used to manage form state
  name: FieldPath<z.infer<typeof formSchema>>, // The name prop is of type FieldPath from react-hook-form and is used to identify the field in the form
  label: string, // The label prop is a string that will be used as the label for the input field
  placeholder: string // The placeholder prop is a string that will be used as the placeholder text for the input field
}

// Define the CustomInput component
const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  return (
    // Render the FormField component with the control and name props
    <FormField
      control={control}
      name={name}
      // Render a function that receives the field object as a parameter
      render={({ field }) => (
        // Render the form item wrapper div
        <div className="form-item">
          <FormLabel className="form-label">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input 
                placeholder={placeholder}
                className="input-class"
                type={name === 'password' ? 'password' : 'text'}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  )
}

// Export the CustomInput component
export default CustomInput
