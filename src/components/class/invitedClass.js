import { ClockCircleOutlined, Loading3QuartersOutlined, UserOutlined } from '@ant-design/icons';
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
import { Result, Spin } from 'antd';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteClassMember } from '../../graphql/mutations';
import { toastParams } from '../../utils/params';
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

export default function InvitedClass() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [classList, setClassList] = useState([]);
  console.log('classList', classList);
  const [openClassDetail, setOpenClassDetail] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [classLeaveId, setClassLeaveId] = useState('');

  const getClassList = async () => {
    setPageLoading(true);
    try {
      const classes = await API.graphql(
        graphqlOperation(`query MyQuery {
            getUser(id: "${user.attributes.sub}") {
              ClassMembers {
                items {
                  class {
                    name
                    ClassMembers {
                      items {
                        id
                        userId
                      }
                    }
                    id
                    createdAt
                  }
                }
              }
            }
          }          
      `)
      );
      setClassList(classes.data.getUser.ClassMembers.items);
      setPageLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClassList();
  }, []);

  const handleLeaveClass = (classMember) => {
    try {
      classMember.map(async (member) => {
        if (member.userId === user.attributes.sub) {
          await API.graphql({
            query: deleteClassMember,
            variables: { input: { id: member.id } }
          });
        }
      });

      getClassList();
      toast.success('Rời lớp thành công', toastParams);
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

  const pageLoadingIcon = <Loading3QuartersOutlined spin style={{ fontSize: 30, color: '#005566' }} />;

  return (
    <>
      {pageLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin indicator={pageLoadingIcon} />
        </div>
      ) : (
        <ThemeProvider style={{ textAlign: 'center' }} theme={theme} colorMode="light">
          <Collection
            searchNoResultsFound={
              <Result
                status="404"
                title="Không tìm thấy lớp"
                subTitle="Hãy thử xem lại thông báo để xem có lời mời nào không nhé"
              />
            }
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
              <Card key={classObj.class.id} borderRadius="medium" width="24rem" height="12rem" variation="outlined">
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
                    <Badge backgroundColor="orange.20">#Thành viên</Badge>

                    <Badge
                      onClick={() => {
                        onOpenClassDetail(), setClassLeaveId(classObj.class.id);
                      }}
                      style={{ cursor: 'pointer' }}
                      backgroundColor="green.40">
                      <UserOutlined style={{ marginRight: '0.2vw' }} />
                      {classObj.class.ClassMembers.items.length}
                    </Badge>
                    <Badge backgroundColor="blue.40">
                      <ClockCircleOutlined style={{ marginRight: '0.2vw' }} />
                      {moment(`${classObj.class.createdAt}`).format('L')}
                    </Badge>
                  </Flex>
                  <Divider padding="xs" />
                  <Heading style={{ cursor: 'pointer' }} padding="xs">
                    <Link to={classObj.class.id}>{classObj.class.name}</Link>
                  </Heading>

                  <Divider />

                  <AmplifyButton
                    backgroundColor="red.10"
                    size="small"
                    style={{ margin: '1rem' }}
                    onClick={() => handleLeaveClass(classObj.class.ClassMembers.items)}>
                    Rời lớp
                  </AmplifyButton>
                </View>
              </Card>
            )}
          </Collection>
        </ThemeProvider>
      )}

      <ClassDetail openClassDetail={openClassDetail} classId={classLeaveId} onCloseClassDetail={onCloseClassDetail} />
      <ToastContainer></ToastContainer>
    </>
  );
}
