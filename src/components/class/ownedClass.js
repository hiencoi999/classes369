import { ClockCircleOutlined, Loading3QuartersOutlined, PlusSquareFilled, UserOutlined } from '@ant-design/icons';
import {
  Badge,
  Button as AmplifyButton,
  Card,
  Collection,
  Divider,
  Flex,
  Heading,
  TextField,
  ThemeProvider,
  useAuthenticator,
  View
} from '@aws-amplify/ui-react';
import { Form, Modal, Space, Spin } from 'antd';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect, useState } from 'react';
import { BsJournalPlus } from 'react-icons/bs';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClass, deleteClass, deleteClassMember } from '../../graphql/mutations';
import { toastParams } from '../../utils/params';
import AddMemberPopup from './addMemberPopup';
import ClassDetail from './classDetail';
moment.locale('vi');

const theme = {
  name: 'collection-theme',
  tokens: {
    components: {
      collection: {
        pagination: {
          current: {
            color: { value: 'white' },
            backgroundColor: {
              value: '#005566'
            }
          }
        },
        search: {
          input: {
            color: { value: '{colors.blue.60}' }
          },
          button: {
            color: { value: '{colors.blue.60}' },
            _focus: {
              backgroundColor: {
                value: '{colors.blue.60}'
              },
              color: {
                value: 'white'
              }
            },
            _hover: {
              backgroundColor: {
                value: '{#005566}'
              },
              color: {
                value: 'black'
              }
            }
          }
        }
      }
    }
  }
};

export default function OwnedClass() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [classList, setClassList] = useState([]);
  console.log('classList', classList);
  const [openPopup, setOpenPopup] = useState(false);
  const [openClassDetail, setOpenClassDetail] = useState(false);
  const [openAddMember, setOpenAddMember] = useState(false);
  const [invitation, setInvitation] = useState();
  const [pageLoading, setPageLoading] = useState(false);
  const [classLeaveId, setClassLeaveId] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const getClassList = async () => {
    setPageLoading(true);
    try {
      const classes = await API.graphql(
        graphqlOperation(`query MyQuery {
        getUser(id: "${user.attributes.sub}") {
          Classes {
            items {
              ClassMembers {
                items {
                  id
                  userId
                }
              }
              id
              createdAt
              name
              ownerId
            }
          }
        }
      }
      `)
      );
      setClassList(classes.data.getUser.Classes.items);
      setPageLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClassList();
  }, []);

  const handleCreateClass = async () => {
    try {
      setLoading(true);
      const nameOfClass = form.getFieldValue('class-name');

      await API.graphql({
        query: createClass,
        variables: { input: { name: nameOfClass, ownerId: user.attributes.sub } }
      });

      form.resetFields();

      getClassList();

      setLoading(false);
      setOpenPopup(false);
      toast.success('Tạo lớp thành công', toastParams);
    } catch (error) {
      console.log(error);
      toast.error('Đã có lỗi xảy ra', toastParams);
    }
  };

  const handleDeleteClass = async (classObj) => {
    try {
      if (classObj.ClassMembers.items.length) {
        await Promise.all([
          classObj.ClassMembers.items.map((member) => {
            API.graphql({
              query: deleteClassMember,
              variables: { input: { id: member.id } }
            });
          })
        ]);
      }

      await API.graphql({
        query: deleteClass,
        variables: { input: { id: classObj.id } }
      });

      getClassList();
      toast.success('Xóa lớp thành công', toastParams);
    } catch (error) {
      console.log(error);
      toast.error('Đã có lỗi xảy ra', toastParams);
    }
  };

  const onOpenClassDetail = () => {
    setOpenClassDetail(true);
  };

  const onCloseClassDetail = () => {
    setOpenClassDetail(false);
  };

  const onOpenAddMember = () => {
    setOpenAddMember(true);
  };

  const onCloseAddMember = () => {
    setOpenAddMember(false);
  };

  const pageLoadingIcon = <Loading3QuartersOutlined spin style={{ fontSize: 30, color: '#005566' }} />;

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '1vh' }}>
        <Space>
          <AmplifyButton variation="primary" size="large" onClick={() => setOpenPopup(true)}>
            <PlusSquareFilled />
            Tạo lớp
          </AmplifyButton>
        </Space>
      </div>
      <Modal
        open={openPopup}
        title="Nhập tên lớp"
        onCancel={() => setOpenPopup(false)}
        footer={[
          <AmplifyButton
            isLoading={loading}
            loadingText="Đang tạo"
            key="submit"
            variation="primary"
            onClick={handleCreateClass}>
            Xác nhận
          </AmplifyButton>
        ]}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="class-name"
            rules={[
              {
                required: true,
                message: 'Bạn chưa đặt tên cho lớp!!!'
              }
            ]}>
            <TextField placeholder="Nhập tên lớp hoặc mã lớp học..." />
          </Form.Item>
        </Form>
      </Modal>
      {pageLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin indicator={pageLoadingIcon} />
        </div>
      ) : (
        <ThemeProvider style={{ textAlign: 'center' }} theme={theme} colorMode="light">
          <Collection
            items={classList}
            type="list"
            direction="row"
            gap="3rem"
            wrap="wrap"
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              alignContent: 'space-between'
            }}
            isPaginated
            itemsPerPage={screen.width / 240}
            isSearchable="true"
            searchPlaceholder="Tìm lớp...">
            {(classObj) => (
              <Card key={classObj.id} borderRadius="medium" width="24rem" height="12rem" variation="outlined">
                <View
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                  textAlign="center"
                  padding="xs">
                  <Flex
                    direction="row"
                    justifyContent="space-between"
                    alignItems="stretch"
                    alignContent="space-between"
                    wrap="nowrap">
                    <Badge backgroundColor={classObj.ownerId === user.attributes.sub ? 'orange.60' : 'orange.20'}>
                      {classObj.ownerId === user.attributes.sub ? '#Quản trị viên' : '#Thành viên'}
                    </Badge>

                    <Badge
                      onClick={() => {
                        onOpenClassDetail(), setClassLeaveId(classObj.id);
                      }}
                      style={{ cursor: 'pointer' }}
                      backgroundColor="green.40">
                      <UserOutlined style={{ marginRight: '0.2vw' }} />
                      {classObj.ClassMembers.items.length}
                    </Badge>
                    <Badge backgroundColor="blue.40">
                      <ClockCircleOutlined style={{ marginRight: '0.2vw' }} />
                      {moment(`${classObj.createdAt}`).format('L')}
                    </Badge>
                  </Flex>
                  <Divider padding="xs" />
                  <Heading style={{ cursor: 'pointer' }} padding="xs">
                    <Link to={classObj.id}>{classObj.name}</Link>
                  </Heading>

                  <Divider />

                  <AmplifyButton
                    variation="default"
                    size="small"
                    style={{ margin: '1rem' }}
                    onClick={() => {
                      onOpenAddMember();
                      setInvitation(classObj);
                    }}>
                    <BsJournalPlus style={{ marginRight: '0.2vw' }} />
                    Thêm thành viên
                  </AmplifyButton>

                  <AmplifyButton
                    backgroundColor="red.20"
                    size="small"
                    style={{ margin: '1rem' }}
                    onClick={() => handleDeleteClass(classObj)}>
                    <RiDeleteBin4Line style={{ marginRight: '0.2vw' }} />
                    Xóa lớp
                  </AmplifyButton>
                </View>
              </Card>
            )}
          </Collection>
        </ThemeProvider>
      )}

      <ClassDetail
        openAddMember={openAddMember}
        openClassDetail={openClassDetail}
        classId={classLeaveId}
        classObj={invitation}
        onCloseClassDetail={onCloseClassDetail}
        onCloseAddMember={onCloseAddMember}
      />
      <AddMemberPopup
        openClassDetail={openClassDetail}
        openAddMember={openAddMember}
        classId={classLeaveId}
        classObj={invitation}
        onCloseAddMember={onCloseAddMember}
        onCloseClassDetail={onCloseClassDetail}
      />
      <ToastContainer></ToastContainer>
    </>
  );
}
