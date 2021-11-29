import { useRouter, BlitzPage, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { SignupForm } from 'app/auth/components/SignupForm';
import { useToast } from '@chakra-ui/toast';

const SignupPage: BlitzPage = () => {
  const router = useRouter();
  const toast = useToast();

  const handleSignUpSuccess = async () => {
    toast({
      status: 'success',
      title: 'Account creation successfull',
      description: 'Welcome to the party! You are now ready to use grp',
    });

    await router.push(Routes.Home());
  };

  return (
    <div>
      <SignupForm onSuccess={handleSignUpSuccess} />
    </div>
  );
};

SignupPage.redirectAuthenticatedTo = '/';
SignupPage.getLayout = page => <Layout title="Sign Up">{page}</Layout>;

export default SignupPage;
