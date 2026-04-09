import React, { useState } from 'react';
import { Button, Empty, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { usePasswordContext } from '../context/PasswordContext';
import PasswordCard from './PasswordCard';
import PasswordForm from './PasswordForm';
import { PasswordItem } from '../types';

const PasswordList: React.FC = () => {
  const { state, filteredPasswords } = usePasswordContext();
  const [formVisible, setFormVisible] = useState(false);
  const [editingPassword, setEditingPassword] = useState<PasswordItem | undefined>();

  const handleAdd = () => {
    setEditingPassword(undefined);
    setFormVisible(true);
  };

  const handleEdit = (password: PasswordItem) => {
    setEditingPassword(password);
    setFormVisible(true);
  };

  const handleCancel = () => {
    setFormVisible(false);
    setEditingPassword(undefined);
  };

  if (state.loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 20, textAlign: 'right' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleAdd}
        >
          添加密码
        </Button>
      </div>

      {filteredPasswords.length === 0 ? (
        <Empty
          description={
            state.searchQuery
              ? '没有找到匹配的密码'
              : '还没有保存任何密码，点击上方按钮添加'
          }
        />
      ) : (
          filteredPasswords
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map(password => (
              <PasswordCard
                key={password.id}
                password={password}
                onEdit={handleEdit}
              />
            ))
        )}

      <PasswordForm
        visible={formVisible}
        onCancel={handleCancel}
        editingPassword={editingPassword}
      />
    </div>
  );
};

export default PasswordList;
