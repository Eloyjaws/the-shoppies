import React from 'react';
import { Center, Text } from '@chakra-ui/react';
import { useAppState } from './AppContext';

export function NotificationCard() {
  const { canAddMovieToNomineeList } = useAppState();
  if (canAddMovieToNomineeList()) return null;
  return (
    <Center
      p={8}
      flexDir="column"
      width="100%"
      h={{ xs: '160px', md: '100px' }}
      bg="rgba(255, 10, 100, 0.2)"
      mb={8}
    >
      <Text>Thanks for nominating 5 movies for the shoppies! </Text>
      <Text fontSize="sm">
        Feel free to edit this list before the award show.
      </Text>
    </Center>
  );
}
