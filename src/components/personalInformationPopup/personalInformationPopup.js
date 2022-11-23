import { PlusOutlined } from '@ant-design/icons';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Button, DatePicker, Form, Input, Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { API, Storage } from 'aws-amplify';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { updateUser } from '../../graphql/mutations';
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 8 }
};

export default function PersonalInformationPopup(props) {
  console.log('props', props);
  const isFirstTimeLoggedIn = localStorage.getItem('isFirstTimeLoggedIn');
  console.log('is first time', isFirstTimeLoggedIn);
  const [isOpen, setOpen] = useState(isFirstTimeLoggedIn ? true : false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileList((prev) => [...prev, { url: reader.result }]);
    };
    // then upload `file` from the argument manually
    return false;
  };

  const onFinish = async (e) => {
    try {
      setLoading(true);
      const blob = fileList.length > 0 ? await (await fetch(fileList[fileList.length - 1].url)).blob() : null;
      const file = new File([blob], 'avatar');

      const obj = await Storage.put(`${file.name}_${uuidv4()}`, file);

      const avatarUrl = 'https://classes369-backend-storage-cb42087a70552-staging.s3.amazonaws.com/public/' + obj.key;
      updatePersonalInformation(e.firstName, e.lastName, e.birthday, avatarUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useAuthenticator((context) => [context.user]);

  const updatePersonalInformation = async (firstName, lastName, birthday, avatarUrl) => {
    await API.graphql({
      query: updateUser,
      variables: {
        input: {
          id: user.attributes.sub,
          email: user.attributes.email,
          phoneNumber: user.attributes.phone_number,
          firstName: firstName,
          lastName: lastName,
          birthday: birthday,
          avatarUrl: avatarUrl
        }
      }
    });

    localStorage.removeItem('isFirstTimeLoggedIn');
    props.handleSetAvatarUrl(avatarUrl);
    setLoading(false);
    setOpen(false);
    window.location.reload();
  };

  return (
    <Modal
      centered
      title="Vui lòng nhập những thông tin dưới đây"
      footer={null}
      open={isOpen}
      width={1000}
      className="modalStyle">
      <Form {...formItemLayout} layout="horizontal" onFinish={onFinish}>
        <Form.Item label="Họ" name="firstName">
          <Input required />
        </Form.Item>
        <Form.Item label="Tên" name="lastName">
          <Input required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input defaultValue={user.attributes.email} disabled={true} />
        </Form.Item>
        <Form.Item label="Số điện thoai" name="phoneNumber">
          <Input defaultValue={user.attributes.phone_number} disabled={true} />
        </Form.Item>
        <Form.Item label="Ngày sinh" name="birthday">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label="Tải lên" name="avatar">
          <ImgCrop rotate>
            <Upload
              accept="image/png, image/jpeg, image/jpg"
              maxCount={1}
              listType="picture-card"
              beforeUpload={beforeUpload}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Chọn ảnh đại diện</div>
              </div>
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button block htmlType="submit" type="primary" loading={loading} style={{ marginBottom: '5px' }}>
            Xác nhận
          </Button>
          <Button block type="primary" danger htmlType="reset" style={{ marginBottom: '5px' }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
