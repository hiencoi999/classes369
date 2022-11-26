import { Button, SwitchField, TextAreaField, TextField, useAuthenticator } from '@aws-amplify/ui-react';
import { DatePicker, Form, Space } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import Modal from 'antd/lib/modal/Modal';
import { API } from 'aws-amplify';
import 'dayjs/locale/vi';
import { useState } from 'react';
import { createPost } from '../../graphql/mutations';
export default function AddPostPopup(props) {
  const { user } = useAuthenticator((context) => [context.user]);

  const [datetimeDisabled, setDatetimeDisabled] = useState(1);

  const [form] = Form.useForm();

  const onToggleDatetime = () => {
    datetimeDisabled == 1 ? setDatetimeDisabled(0) : setDatetimeDisabled(1);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  };

  const onFinish = async (e) => {
    try {
      await API.graphql({
        query: createPost,
        variables: {
          input: {
            description: e.description,
            authorId: user.attributes.sub,
            classId: props.classId,
            title: e.title,
            deadline: e.deadline
          }
        }
      });
      form.resetFields();
      props.onCancel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal width="50vw" footer={null} title="Tạo thông báo" open={props.open} onCancel={props.onCancel}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="title">
          <TextField maxLength={200} label="Tiêu đề"></TextField>
        </Form.Item>
        <Form.Item name="description">
          <TextAreaField isRequired={true} label="Nội dung *"></TextAreaField>
        </Form.Item>

        <Space>
          <Form.Item>
            <SwitchField
              value={datetimeDisabled}
              onChange={onToggleDatetime}
              label="Có deadline?"
              labelPosition="start"
            />
          </Form.Item>
          <Form.Item name="deadline">
            <DatePicker
              disabled={datetimeDisabled}
              disabledDate={disabledDate}
              locale={locale}
              status="warning"
              placeholder="Chọn ngày đến hạn"
              showTime
            />
          </Form.Item>
        </Space>
        <Form.Item>
          <Button style={{ float: 'right' }} variation="primary" type="submit">
            Tạo
          </Button>
        </Form.Item>
        {/* <Dragger height="20vh">
          <p className="ant-upload-drag-icon">
          <InboxOutlined />
          </p>
          <p className="ant-upload-text">Tải lên ảnh, video, file ...</p>
        </Dragger> */}
      </Form>
    </Modal>
  );
}
