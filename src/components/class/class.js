import { ClockCircleOutlined, Loading3QuartersOutlined, PlusSquareFilled, UserOutlined } from '@ant-design/icons';
import {
  Badge,
  Button as AmplifyButton,
  Card,
  Collection,
  Divider,
  Flex,
  Heading,
  ThemeProvider,
  useAuthenticator,
  View
} from '@aws-amplify/ui-react';
import { Button, Form, Input, Modal, Spin } from 'antd';
import { API } from 'aws-amplify';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect, useState } from 'react';
import { BsJournalPlus } from 'react-icons/bs';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClass, createClassMember, deleteClass, deleteClassMember } from '../../graphql/mutations';
import { listClasses, listClassMembers } from '../../graphql/queries';
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

export default function ClassManagement() {
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
      // get array classIds of user
      const classIds = await API.graphql({
        query: listClassMembers,
        variables: {
          filter: {
            userId: { eq: user.attributes.sub }
          }
        }
      });

      const classes = await Promise.all(
        classIds.data.listClassMembers.items.map(async (element) => {
          const data = await API.graphql({
            query: listClasses,
            variables: { filter: { id: { eq: element.classId } } }
          });

          const data2 = await API.graphql({
            query: listClassMembers,
            variables: { filter: { classId: { eq: element.classId } } }
          });
          data.data.listClasses.items.push(data2.data.listClassMembers.items.length);
          return data.data.listClasses.items;
        })
      );

      for (let index = 0; index < classes.length; index++) {
        classes[index].push(classIds.data.listClassMembers.items[index].role);
      }

      setClassList(classes);
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

      const data = await API.graphql({
        query: createClass,
        variables: { input: { name: nameOfClass } }
      });

      const createdMember = await API.graphql({
        query: createClassMember,
        variables: { input: { userId: user.attributes.sub, classId: data.data.createClass.id, role: 'MANAGER' } }
      });

      form.resetFields();

      delete data.data.createClass.ClassMembers;

      setClassList(classList.concat([[data.data.createClass, 1, createdMember.data.createClassMember.role]]));
      setLoading(false);
      setOpenPopup(false);
      toast.success('Thành công', toastParams);
    } catch (error) {
      console.log(error);
      toast.error('Đã có lỗi xảy ra', toastParams);
    }
  };

  const handleDeleteClass = async (aClass) => {
    try {
      const [, members] = await Promise.all([
        API.graphql({
          query: deleteClass,
          variables: { input: { id: aClass.id } }
        }),
        API.graphql({
          query: listClassMembers,
          variables: { filter: { classId: { eq: aClass.id } } }
        })
      ]);

      await Promise.all(
        members.data.listClassMembers.items.map(async (member) => {
          await API.graphql({
            query: deleteClassMember,
            variables: { input: { id: member.id } }
          });
        })
      );

      setClassList(classList.filter((cls) => cls[0].id !== aClass.id));
      toast.success('Thành công', toastParams);
    } catch (error) {
      console.log(error);
      toast.error('Đã có lỗi xảy ra', toastParams);
    }
  };

  const handleLeaveClass = async (classId) => {
    try {
      const classMember = await API.graphql({
        query: listClassMembers,
        variables: { filter: { classId: { eq: classId }, userId: { eq: user.attributes.sub } } }
      });

      await API.graphql({
        query: deleteClassMember,
        variables: { input: { id: classMember.data.listClassMembers.items[0].id } }
      });

      setClassList(classList.filter((cls) => cls[0].id !== classId));
      toast.success('Thành công', toastParams);
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

  const pageLoadingIcon = <Loading3QuartersOutlined spin style={{ fontSize: 60, color: '#005566' }} />;

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '1vh' }}>
        <AmplifyButton variation="primary" size="large" onClick={() => setOpenPopup(true)}>
          <PlusSquareFilled style={{ marginRight: '0.2vw' }} />
          Tạo lớp
        </AmplifyButton>
      </div>
      <Modal
        open={openPopup}
        title="Nhập tên lớp"
        onCancel={() => setOpenPopup(false)}
        footer={[
          <Button loading={loading} key="submit" type="primary" onClick={handleCreateClass}>
            Xác nhận
          </Button>
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
            <Input size="large" placeholder="Nhập tên lớp hoặc mã lớp học..." />
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
            {(item) => (
              <Card key={item[0].id} borderRadius="medium" width="24rem" height="12rem" variation="outlined">
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
                    <Badge backgroundColor={item[2] === 'MANAGER' ? 'orange.60' : 'orange.20'}>
                      {item[2] === 'MANAGER' ? '#Quản trị viên' : '#Thành viên'}
                    </Badge>

                    <Badge
                      onClick={() => {
                        onOpenClassDetail(), setClassLeaveId(item[0].id);
                      }}
                      style={{ cursor: 'pointer' }}
                      key={item[1]}
                      backgroundColor="green.40">
                      <UserOutlined style={{ marginRight: '0.2vw' }} />
                      {item[1]}
                    </Badge>
                    <Badge key={item[0].createdAt} backgroundColor="blue.40">
                      <ClockCircleOutlined style={{ marginRight: '0.2vw' }} />
                      {moment(`${item[0].updatedAt}`).format('L')}
                    </Badge>
                  </Flex>
                  <Divider padding="xs" />
                  <Heading style={{ cursor: 'pointer' }} padding="xs">
                    <Link to={item[0].id}>{item[0].name}</Link>
                  </Heading>

                  <Divider />
                  {item[2] == 'STUDENT' ? (
                    <AmplifyButton
                      backgroundColor="red.10"
                      size="small"
                      style={{ margin: '1rem' }}
                      onClick={() => handleLeaveClass(item[0].id)}>
                      Rời lớp
                    </AmplifyButton>
                  ) : (
                    <>
                      <AmplifyButton
                        variation="default"
                        size="small"
                        style={{ margin: '1rem' }}
                        onClick={() => {
                          onOpenAddMember();
                          setInvitation(item[0]);
                        }}>
                        <BsJournalPlus style={{ marginRight: '0.2vw' }} />
                        Thêm thành viên
                      </AmplifyButton>

                      <AmplifyButton
                        backgroundColor="red.20"
                        size="small"
                        style={{ margin: '1rem' }}
                        onClick={() => handleDeleteClass(item[0])}>
                        <RiDeleteBin4Line style={{ marginRight: '0.2vw' }} />
                        Xóa lớp
                      </AmplifyButton>
                    </>
                  )}
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
