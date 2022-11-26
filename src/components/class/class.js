import { Button } from '@aws-amplify/ui-react';
import { Space } from 'antd';
import { Link } from 'react-router-dom';
export default function ClassController() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Space>
        <Button>
          <Link to="/class/owned">Quản lý lớp của tôi</Link>
        </Button>
        <Button>
          <Link to="/class/invited">Lớp tôi là thành viên</Link>
        </Button>
      </Space>
    </div>
  );
}
