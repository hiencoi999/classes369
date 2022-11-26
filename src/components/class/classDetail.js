import { Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider } from '@aws-amplify/ui-react';
import { Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { API } from 'aws-amplify';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getUser, listClassMembers } from '../../graphql/queries';
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
    return listMember.map((member) => (
      <TableRow key={member.id}>
        <TableCell>{member.firstName}</TableCell>
        <TableCell>{member.lastName}</TableCell>
        <TableCell>{moment(member.birthday).format('L')}</TableCell>
        <TableCell>{member.email}</TableCell>
        <TableCell>{member.phoneNumber}</TableCell>
      </TableRow>
    ));
  };

  const getMemberList = async () => {
    try {
      setLoading(true);
      const res = await API.graphql({
        query: listClassMembers,
        variables: { filter: { classId: { eq: props.classId }, role: { eq: 'STUDENT' } } }
      });

      const data = await Promise.all(
        res.data.listClassMembers.items.map(async (item) => {
          console.log('item', item);
          const temp = await API.graphql({
            query: getUser,
            variables: { id: item.userId }
          });

          return temp.data.getUser;
        })
      );

      setListMember(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMemberList();
  }, [props.classId]);

  return (
    <Modal
      width="50%"
      open={props.openClassDetail}
      title="Thông tin chi tiết"
      footer={null}
      onCancel={props.onCloseClassDetail}>
      <Spin size="large" spinning={loading}>
        <ThemeProvider theme={theme} colorMode="light">
          <Table highlightOnHover variation="striped">
            <TableHead>
              <TableRow>
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
