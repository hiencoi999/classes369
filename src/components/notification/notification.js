import { useAuthenticator } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';
import React, { useEffect } from 'react';
import { getUser } from '../../graphql/queries';
export default function Notification() {
  const { user } = useAuthenticator((context) => [context.user]);
  console.log(user.username);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const data = await API.graphql({
      query: getUser,
      variables: { email: '19021269@vnu.edu.vn' }
    });
    console.log({ data });
  };

  return <h1>Notification</h1>;
}
