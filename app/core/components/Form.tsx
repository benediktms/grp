import React, { ReactNode, PropsWithoutRef } from 'react';
import { Form as FinalForm, FormProps as FinalFormProps } from 'react-final-form';
import { z } from 'zod';
import { Button } from '@chakra-ui/button';
import { validateZodSchema } from 'blitz';
import { Box } from '@chakra-ui/layout';
export { FORM_ERROR } from 'final-form';

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  /** All your form fields */
  children?: ReactNode;
  /** Text to display in the submit button */
  submitText?: string;
  schema?: S;
  onSubmit: FinalFormProps<z.infer<S>>['onSubmit'];
  initialValues?: FinalFormProps<z.infer<S>>['initialValues'];
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError, hasValidationErrors }) => {
        return (
          <form onSubmit={handleSubmit} className="form" {...props}>
            {/* Form fields supplied as children are rendered here */}
            {children}

            <Box mt={5}>
              {submitError && (
                <div role="alert" style={{ color: 'red' }}>
                  {submitError}
                </div>
              )}

              {submitText && (
                <Button type="submit" disabled={submitting || hasValidationErrors}>
                  {submitText}
                </Button>
              )}
            </Box>
            <style global jsx>{`
              .form > * + * {
                margin-top: 1rem;
              }
            `}</style>
          </form>
        );
      }}
    />
  );
}

export default Form;
