import { Alert, Button, useAuthenticator } from '@aws-amplify/ui-react';
import { Space } from 'antd';
import { API } from 'aws-amplify';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { createClassMember, deleteClassInvitation } from '../../graphql/mutations';
import { listClassInvitations } from '../../graphql/queries';

moment.locale('vi');

export default function Notification() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [data, setData] = useState([]);

  console.log('data', data);
  console.log(user.username);

  useEffect(() => {
    fetchClassInvitation();
  }, []);

  const fetchClassInvitation = async () => {
    const res = await API.graphql({
      query: listClassInvitations,
      variables: { filter: { targetEmail: { eq: user.attributes.email } } }
    });

    setData(res.data.listClassInvitations.items);
  };

  const acceptInvitation = async (item) => {
    console.log('item la', item);
    try {
      await API.graphql({
        query: createClassMember,
        variables: { input: { classId: item.classInviteId, role: 'STUDENT', userId: user.attributes.sub } }
      });
      refuseInvitation(item.id);
    } catch (error) {
      console.log(error);
    }
  };

  const refuseInvitation = async (id) => {
    try {
      await API.graphql({
        query: deleteClassInvitation,
        variables: { input: { id: id } }
      });

      setData(data.filter((dt) => dt.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const AlertRenderer = () => {
    return data.map((item, index) => (
      <Alert
        style={{ marginBottom: '1rem', borderRadius: '10px', border: 'solid 1px' }}
        key={index}
        fontSize="1.2rem"
        variation="success"
        isDismissible={false}
        hasIcon={true}
        heading={
          <Space direction="vertical" style={{ float: 'right' }}>
            <Button loadingText="Đang tải" onClick={() => acceptInvitation(item)}>
              Đồng ý
            </Button>
            <Button onClick={() => refuseInvitation(item.id)}>Từ chối</Button>
          </Space>
        }>
        <strong>{item.hostEmail}</strong> đã mời bạn tham tham gia lớp <strong>{item.nameOfClass}</strong>
        <br></br>
        <br></br>
        {moment(`${item.createdAt}`).fromNow()}
      </Alert>
    ));
  };

  return data.length == 0 ? (
    <h1>Bạn chưa có thông báo nào</h1>
  ) : (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <AlertRenderer></AlertRenderer>
      </Space>
    </>
  );
}
