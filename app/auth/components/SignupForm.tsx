import { useMutation } from 'blitz';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { Form, FORM_ERROR } from 'app/core/components/Form';
import signup from 'app/auth/mutations/signup';
import { Signup } from 'app/auth/validations';
import { useToast } from '@chakra-ui/toast';
import React from 'react';
import { Container } from '@chakra-ui/react';

type SignupFormProps = {
  onSuccess: () => void;
};

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const [signupMutation] = useMutation(signup);
  const toast = useToast();

  return (
    <Container>
      <Form
        submitText="Create Account"
        showLoginButton
        schema={Signup}
        initialValues={{ email: '', password: '', passwordConfirmation: '' }}
        onSubmit={async values => {
          try {
            await signupMutation(values);
            onSuccess();
          } catch (error) {
            console.log(error);
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
              const message: string = 'This email is already in use';

              toast({
                status: 'error',
                title: 'Sign up failed',
                description: message,
              });

              // This error comes from Prisma
              return { email: message };
            } else {
              toast({ status: 'error', title: 'Sign up failed', description: error.toString() });

              return { [FORM_ERROR]: error.toString() };
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <LabeledTextField
          name="passwordConfirmation"
          label="Confirm password"
          placeholder="Password"
          type="password"
        />
      </Form>
    </Container>
  );
};

export default SignupForm;
