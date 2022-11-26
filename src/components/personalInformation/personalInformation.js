import { PlusOutlined } from '@ant-design/icons';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Button, DatePicker, Form, Input, Upload } from 'antd';
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

export default function PersonalInformation() {
  // @ts-ignore

  const [isDisabledForm, setDisableFrom] = useState(true);

  const [fileList, setFileList] = useState([]);
  console.log(fileList);
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
      const blob = fileList.length > 0 ? await (await fetch(fileList[fileList.length - 1].url)).blob() : null;
      const file = new File([blob], 'avatar');

      const obj = await Storage.put(`${file.name}_${uuidv4()}`, file);

      localStorage.setItem('avatar', obj.key);
      const avatarUrl = obj.key;
      updatePersonalInformation(e.firstName, e.lastName, e.birthday, avatarUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useAuthenticator((context) => [context.user]);

  const updatePersonalInformation = async (firstName, lastName, birthday, avatarUrl) => {
    const data = await API.graphql({
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
    console.log(data);
  };

  return (
    <Form {...formItemLayout} layout="horizontal" onFinish={onFinish}>
      <Form.Item label="Họ" name="firstName">
        <Input className="inputInfo" disabled={isDisabledForm} />
      </Form.Item>
      <Form.Item label="Tên" name="lastName">
        <Input className="inputInfo" disabled={isDisabledForm} />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input className="inputInfo" defaultValue={user.attributes.email} disabled={true} />
      </Form.Item>
      <Form.Item label="Số điện thoai" name="phoneNumber">
        <Input className="inputInfo" defaultValue={user.attributes.phone_number} disabled={true} />
      </Form.Item>
      <Form.Item label="Ngày sinh" name="birthday">
        <DatePicker
          style={{ width: '100%', border: 'solid thin black' }}
          format="YYYY-MM-DD"
          disabled={isDisabledForm}
        />
      </Form.Item>
      <Form.Item label="Tải lên" name="avatar">
        <ImgCrop rotate>
          <Upload
            style={{ width: '100px', border: 'solid thin black' }}
            disabled={isDisabledForm}
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
        <Button disabled={isDisabledForm} block type="primary" htmlType="submit" style={{ marginBottom: '5px' }}>
          Xác nhận
        </Button>
        <Button disabled={isDisabledForm} block type="primary" danger htmlType="reset" style={{ marginBottom: '5px' }}>
          Hủy
        </Button>
        <Button
          block
          htmlType="button"
          onClick={() => {
            setDisableFrom(false);
          }}
          style={{ marginBottom: '5px' }}>
          Chỉnh sửa
        </Button>
      </Form.Item>
    </Form>
  );
}
