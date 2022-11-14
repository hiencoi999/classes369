// import { PlusOutlined } from '@ant-design/icons';
// import {
//   Button,
//   Cascader,
//   Checkbox,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Radio,
//   Select,
//   Switch,
//   TreeSelect,
//   Upload
// } from 'antd';
// import 'antd/dist/antd.css';
// import React, { useState } from 'react';

// const { RangePicker } = DatePicker;
// const { TextArea } = Input;

// export default function PersonalInformation() {
//   const [componentDisabled, setComponentDisabled] = useState(true);
//   const onFormLayoutChange = (disabled) => {
//     setComponentDisabled(disabled);
//   };

//   return (
//     <>
//       <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)}>
//         Form disabled
//       </Checkbox>
//       <Form
// labelCol={{ span: 4 }}
// wrapperCol={{ span: 14 }}
// layout="horizontal"
// onValuesChange={onFormLayoutChange}
//         disabled={componentDisabled}>
//         <Form.Item label="Chekbox" name="disabled" valuePropName="checked">
//           <Checkbox>Checkbox</Checkbox>
//         </Form.Item>
//         <Form.Item label="Radio">
//           <Radio.Group>
//             <Radio value="apple"> Apple </Radio>
//             <Radio value="pear"> Pear </Radio>
//           </Radio.Group>
//         </Form.Item>
//         <Form.Item label="Input">
//           <Input />
//         </Form.Item>
//         <Form.Item label="Select">
//           <Select>
//             <Select.Option value="demo">Demo</Select.Option>
//           </Select>
//         </Form.Item>
//         <Form.Item label="TreeSelect">
//           <TreeSelect
//             treeData={[{ title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] }]}
//           />
//         </Form.Item>
//         <Form.Item label="Cascader">
//           <Cascader
//             options={[
//               {
//                 value: 'zhejiang',
//                 label: 'Zhejiang',
//                 children: [
//                   {
//                     value: 'hangzhou',
//                     label: 'Hangzhou'
//                   }
//                 ]
//               }
//             ]}
//           />
//         </Form.Item>
// <Form.Item label="DatePicker">
//   <DatePicker />
// </Form.Item>
//         <Form.Item label="RangePicker">
//           <RangePicker />
//         </Form.Item>
//         <Form.Item label="InputNumber">
//           <InputNumber />
//         </Form.Item>
//         <Form.Item label="TextArea">
//           <TextArea rows={4} />
//         </Form.Item>
//         <Form.Item label="Switch" valuePropName="checked">
//           <Switch />
//         </Form.Item>
// <Form.Item label="Upload" valuePropName="fileList">
//   <Upload action="/upload.do" listType="picture-card">
//     <div>
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   </Upload>
// </Form.Item>
// <Form.Item label="Button">
//   <Button>Button</Button>
// </Form.Item>
//       </Form>
//     </>
//   );
// }
import { PlusOutlined } from '@ant-design/icons';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Button, DatePicker, Form, Input, Upload } from 'antd';
import { API } from 'aws-amplify';
import { updateUser } from '../../graphql/mutations';
export default function PersonalInformation() {
  const onFinish = (e) => {
    console.log(e);
    updatePersonalInformation(e.firstName, e.lastName, e.birthday);
  };

  const { user } = useAuthenticator((context) => [context.user]);

  const updatePersonalInformation = async (firstName, lastName, birthday) => {
    const data = await API.graphql({
      query: updateUser,
      variables: {
        input: {
          id: user.attributes.sub,
          email: user.attributes.email,
          phoneNumber: user.attributes.phone_number,
          firstName: firstName,
          lastName: lastName,
          birthday: birthday
        }
      }
    });
    console.log(data);
  };

  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 4 }} layout="horizontal" onFinish={onFinish}>
      <Form.Item label="Họ" name="firstName">
        <Input required />
      </Form.Item>
      <Form.Item label="Tên" name="lastName">
        <Input required />
      </Form.Item>
      <Form.Item label="Ngày sinh" name="birthday">
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item valuePropName="fileList">
        <Upload action="/abc" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Chọn ảnh đại diện</div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button block htmlType="submit">
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  );
}
