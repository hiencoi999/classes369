import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge, Divider } from '@aws-amplify/ui-react';
import { Button, Space } from 'antd';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { onCreatePost } from '../../graphql/subscriptions';
import { S3_PREFIX } from '../../utils/params';
import AddPostPopup from './post';
moment.locale('vi');
export default function Forum() {
  const [toggleNormalPopup, setToggleNormalPopup] = useState(false);
  const [posts, setPosts] = useState([]);
  const pathParam = useParams();
  const navigate = useNavigate();
  console.log('posts', posts);
  const onOpenAddPostPopup = () => {
    setToggleNormalPopup(true);
  };

  const cancelAddPostPopup = () => {
    setToggleNormalPopup(false);
  };

  const fetchPost = async () => {
    const data = await API.graphql(
      graphqlOperation(`query MyQuery {
        getClass(id: "${pathParam.classId}") {
          Posts {
            items {
              title
              author {  
                lastName
                firstName
                avatarUrl
              }
              deadline
              description
              createdAt
              id
            }
          }
        }
      }
      `)
    );

    setPosts(data.data.getClass.Posts.items);
  };

  API.graphql(graphqlOperation(onCreatePost)).subscribe({
    next: (result) => {
      console.log('result', result);
      setPosts(posts.concat([result.value.data.onCreatePost]));
    },
    error: (error) => console.warn(error)
  });

  useEffect(() => {
    fetchPost();
  }, []);

  const PostComponent = () => {
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return posts.map((post) => (
      <div
        key={post.id}
        style={{
          marginBottom: '1rem',
          border: 'solid thin grey',
          borderRadius: '10px 10px 0 0',
          boxShadow: '5px 5px 5px #005566'
        }}>
        <Space
          style={{
            width: '100%',
            borderRadius: '10px 10px 0 0',
            backgroundColor: '#005566',
            color: 'white'
          }}>
          <img
            src={S3_PREFIX + post.author.avatarUrl}
            style={{ height: '3rem', width: '3rem', borderRadius: '10px 0 0 0 ' }}></img>
          <Space direction="vertical">
            <strong>{post.author.firstName + ' ' + post.author.lastName}</strong>

            <span> {moment(post.createdAt).calendar()}</span>
          </Space>
          {post.deadline ? (
            <Badge backgroundColor="red.40" style={{ float: 'right', marginLeft: '3rem' }}>
              Hạn trong {moment(`${post.deadline}`).fromNow()}
            </Badge>
          ) : null}
        </Space>

        <h1 style={{ fontSize: '20px', marginLeft: '1rem', fontWeight: 'bold' }}>{post.title}</h1>
        {post.title ? <Divider size="large" style={{ width: '96%', left: '2%' }} /> : null}

        <p style={{ fontSize: '16px', marginLeft: '1rem' }}>{post.description}</p>
      </div>
    ));
  };

  return (
    <div style={{ position: 'relative' }}>
      <div>
        <Button onClick={() => navigate(-1)} shape="circle" style={{ backgroundColor: '#005566', color: 'white' }}>
          <LeftOutlined />
        </Button>

        <Button
          onClick={onOpenAddPostPopup}
          shape="circle"
          style={{
            float: 'right',
            height: '4rem',
            width: '4rem',
            right: '2rem',
            bottom: '2rem',
            position: 'fixed',
            backgroundColor: '#005566',
            color: 'white',
            fontSize: '20px'
          }}>
          <PlusOutlined />
        </Button>

        <AddPostPopup open={toggleNormalPopup} classId={pathParam.classId} onCancel={cancelAddPostPopup} />
      </div>
      <Space direction="vertical" style={{ width: '60%', top: '50%', left: '20%', position: 'absolute' }}>
        <PostComponent />
      </Space>
      <ToastContainer />
    </div>
  );
}
