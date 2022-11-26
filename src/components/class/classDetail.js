import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider } from '@aws-amplify/ui-react';
import { Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import { useEffect, useState } from 'react';

moment.locale('vi');
export default function ClassDetail(props) {
  const [listMember, setListMember] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log('listMember', listMember);
  const theme = {
    name: 'table-theme',
    tokens: {
      components: {
        table: {
          row: {
            hover: {
              backgroundColor: { value: '{colors.blue.20}' }
            },

            striped: {
              backgroundColor: { value: '{colors.blue.10}' }
            }
          },

          header: {
            color: { value: '{colors.blue.80}' },
            fontSize: { value: '{fontSizes.xl}' }
          },

          data: {
            fontWeight: { value: '{fontWeights.semibold}' }
          }
        }
      }
    }
  };

  const TableComponent = () => {
    return listMember.map((member, index) => (
      <TableRow key={index}>
        <TableCell>
          <img
            src={
              'https://classes369-backend-storage-cb42087a70552-staging.s3.amazonaws.com/public/' +
              member.user.avatarUrl
            }
            style={{ height: '3rem', width: '3rem', border: 'black solid thin', borderRadius: '50%' }}
          />
        </TableCell>
        <TableCell>{member.user.firstName}</TableCell>
        <TableCell>{member.user.lastName}</TableCell>
        <TableCell>{moment(member.user.birthday).format('L')}</TableCell>
        <TableCell>{member.user.email}</TableCell>
        <TableCell>{member.user.phoneNumber}</TableCell>
      </TableRow>
    ));
  };

  const getMemberList = async () => {
    try {
      setLoading(true);
      const data = await API.graphql(
        graphqlOperation(`
      query MyQuery {
        getClass(id: "${props.classId}") {
          ClassMembers {
            items {
              user {
                phoneNumber
                lastName
                firstName
                email
                birthday
                avatarUrl
              }
            }
          }
        }
      }`)
      );
      console.log('data fff', data);
      setListMember(data.data.getClass.ClassMembers.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMemberList();
  }, [props.classId]);

  const pageLoadingIcon = <Loading3QuartersOutlined spin style={{ fontSize: 30, color: '#005566' }} />;

  return (
    <Modal
      width="80%"
      open={props.openClassDetail}
      title="Thông tin chi tiết"
      footer={null}
      onCancel={props.onCloseClassDetail}>
      <Spin indicator={pageLoadingIcon} spinning={loading}>
        <ThemeProvider theme={theme} colorMode="light">
          <Table highlightOnHover variation="striped">
            <TableHead>
              <TableRow>
                <TableCell as="th">Ảnh</TableCell>
                <TableCell as="th">Họ</TableCell>
                <TableCell as="th">Tên</TableCell>
                <TableCell as="th">Ngày sinh</TableCell>
                <TableCell as="th">Email</TableCell>
                <TableCell as="th">Số điện thoại</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableComponent></TableComponent>
            </TableBody>
          </Table>
        </ThemeProvider>
      </Spin>
    </Modal>
  );
}
