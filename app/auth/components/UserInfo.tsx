import { Button, HStack, Skeleton } from '@chakra-ui/react';
import { useMutation, Routes, Link } from 'blitz';
import React from 'react';
import { useCurrentUser } from '../../core/hooks/useCurrentUser';
import logout from '../mutations/logout';

export const UserInfo = () => {
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

export const UserInfoFallback = () => {
  return (
    <HStack spacing={3} m={10}>
      <Skeleton w="50%" h="40px" borderRadius="5px" />
      <Skeleton w="50%" h="40px" borderRadius="5px" />
    </HStack>
  );
};
