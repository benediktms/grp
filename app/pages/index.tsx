import { BlitzPage, Routes, useRouter } from 'blitz';
import { Container, Heading } from '@chakra-ui/layout';
import React from 'react';
import Layout from 'app/core/layouts/Layout';
import { useToast } from '@chakra-ui/react';
import SignupForm from '../auth/components/SignupForm';

const Home: BlitzPage = () => {
  const toast = useToast();
  const router = useRouter();

  const handleSignUpSuccess = async () => {
    toast({
      status: 'success',
      title: 'Account creation successfull',
      description: 'Welcome to the party! You are now ready to use grp',
    });

    await router.push(Routes.Home());
  };

  return (
    <>
      <Container>
        <Heading as="h1" size="lg" textAlign="center" my={10}>
          Welcome to grp
        </Heading>
        <SignupForm onSuccess={handleSignUpSuccess} />
      </Container>
    </>
  );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = page => <Layout title="Home">{page}</Layout>;

export default Home;
