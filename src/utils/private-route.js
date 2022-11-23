import { useAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';
import { Navigate } from 'react-router-dom';
export default function PrivateRoute({ children }) {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return authStatus === 'authenticated' ? children : <Navigate to="/auth" />;
}
