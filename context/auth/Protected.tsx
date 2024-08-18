import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '@/context/auth/auth';

interface ProtectedRoutesProps {
  children: React.ReactNode; // This defines the type for children prop
}

function ProtectedRoutes({ children }: ProtectedRoutesProps): React.JSX.Element {
  const { session } = useSession();

  if (!session) {
    // Redirect to login if not authenticated
    return <Redirect href="/login" />;
  }

  // If authenticated, render the children (protected routes)
  return <Stack>{children}</Stack>;
  // return <>{children}</>;
}

export default ProtectedRoutes;