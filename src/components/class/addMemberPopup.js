import { Button as AmplifyButton, useAuthenticator } from '@aws-amplify/ui-react';
import { Upload } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { API } from 'aws-amplify';
import { useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';
import { BiMailSend } from 'react-icons/bi';
import { MdInfoOutline, MdOutlineFileUpload } from 'react-icons/md';
import { isEmail, ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
import { createClassInvitation } from '../../graphql/mutations';
export default function AddMemberPopup(props) {
  console.log('props', props);

  const { user } = useAuthenticator((context) => [context.user]);

  const [isOpened, setOpenModal] = useState(true);
  const [emails, setEmails] = useState([]);

  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);

  const handleOnCancel = () => {
    props.handleCloseAddMember(false);
    setOpenModal(false);
  };

  const getLabel = (email, index, removeEmail) => {
    return (
      <div style={{ backgroundColor: '#005566', color: 'white' }} data-tag key={index}>
        {email}
        <span
          data-tag-handle
          onClick={() => {
            removeEmail(index);
          }}>
          ×
        </span>
      </div>
    );
  };

  const handleBeforeUpload = (file) => {
    let fileObj = file;
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setRows(resp.rows);
        setCols(resp.cols);
      }
    });

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < cols.length; j++) {
        if (rows[i][j].toLowerCase() == 'email') {
          let listEmails = [];
          for (let k = i + 1; k < rows.length; k++) {
            console.log(rows[k][j]);
            listEmails.push(rows[k][j]);
          }
          setEmails(listEmails);
        }
      }
    }
  };

  const sendInvitation = async (classId, nameOfClass) => {
    console.log('classId ', classId);
    console.log('nameOfClass ', nameOfClass);
    setLoading(true);
    try {
      await Promise.all(
        emails.map(async (email) => {
          await API.graphql({
            query: createClassInvitation,
            variables: {
              input: {
                classInviteId: classId,
                targetEmail: email,
                hostEmail: user.attributes.email,
                nameOfClass: nameOfClass
              }
            }
          });
        })
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    handleOnCancel();
  };

  return (
    <Modal
      width="50vw"
      open={isOpened}
      title="Thêm thành viên"
      footer={[
        <p key="info" style={{ color: 'orange' }}>
          <MdInfoOutline key="icon" /> Để gửi nhiều Email, hãy nhấn Enter/Tab/Space sau mỗi lần nhập một Email
        </p>
      ]}
      on
      onCancel={handleOnCancel}>
      <div style={{ textAlign: 'center' }}>
        <Upload maxCount={1} accept=".xlsx" beforeUpload={handleBeforeUpload} onRemove={() => setEmails([])}>
          <AmplifyButton>
            {' '}
            <MdOutlineFileUpload></MdOutlineFileUpload>Thêm từ excel
          </AmplifyButton>
        </Upload>
      </div>
      <br></br>
      <ReactMultiEmail
        focused="true"
        placeholder="Nhập email thành viên"
        emails={emails}
        onChange={(_emails) => {
          setEmails(_emails);
        }}
        validateEmail={(email) => {
          return isEmail(email); // return boolean
        }}
        getLabel={getLabel}
      />

      <AmplifyButton
        isLoading={loading}
        loadingText="Đang thực hiện..."
        marginTop="0.5rem"
        variation="primary"
        isFullWidth="true"
        onClick={() => {
          sendInvitation(props.classObj.id, props.classObj.name);
        }}>
        <BiMailSend></BiMailSend>
        Gửi lời mời
      </AmplifyButton>
    </Modal>
  );
}
