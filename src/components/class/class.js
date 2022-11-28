import { Button } from '@aws-amplify/ui-react';
import { Space } from 'antd';
import { Link } from 'react-router-dom';
export default function ClassController() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Space>
        <Button>
          <Link to="/class/owned" style={{ color: '#005566' }}>
            Quản lý lớp của tôi
          </Link>
        </Button>
        <Button>
          <Link to="/class/invited" style={{ color: '#005566' }}>
            Lớp tôi là thành viên
          </Link>
        </Button>
      </Space>
    </div>
  );
}
