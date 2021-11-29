import { Link, BlitzPage, useMutation, Routes } from 'blitz';
import { useCurrentUser } from 'app/core/hooks/useCurrentUser';
import logout from 'app/auth/mutations/logout';
import { Button } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import { Text, Container, Heading, HStack } from '@chakra-ui/layout';
import React, { Suspense } from 'react';
import Layout from 'app/core/layouts/Layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useToast } from '@chakra-ui/react';

const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  if (currentUser) {
    return (
      <>
        <Button
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </Button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    );
  } else {
    return (
      <HStack spacing={3} m={10}>
        <Link href={Routes.SignupPage()}>
          <Button w="50%">Sign up</Button>
        </Link>
        <Link href={Routes.LoginPage()}>
          <Button w="50%">Login</Button>
        </Link>
      </HStack>
    );
  }
};

const UserInfoFallback = () => {
  return (
    <HStack spacing={3} m={10}>
      <Skeleton w="50%" h="40px" borderRadius="5px" />
      <Skeleton w="50%" h="40px" borderRadius="5px" />
    </HStack>
  );
};

const Home: BlitzPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  return (
    <>
      <Container>
        <Heading as="h1" size="lg" textAlign="center" my={10}>
          Welcome to grp
        </Heading>
        <Text textAlign="center">Sign up or login to continue</Text>
        <Suspense fallback={UserInfoFallback}>
          <UserInfo />
        </Suspense>
        <Button onClick={toggleColorMode}>{colorMode === 'light' ? 'Dark' : 'Light'}</Button>
        <Button
          onClick={() =>
            toast({
              title: 'Test',
              description: 'checking if notifications work',
              status: 'success',
            })
          }
        >
          Test notifications
        </Button>
      </Container>
    </>
  );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = page => <Layout title="Home">{page}</Layout>;

export default Home;
