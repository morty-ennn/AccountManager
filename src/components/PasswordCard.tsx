import React, { useState } from 'react';
import { Card, Button, Tag, message, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CopyOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { PasswordItem } from '../types';
import { usePasswordContext } from '../context/PasswordContext';

interface PasswordCardProps {
  password: PasswordItem;
  onEdit: (password: PasswordItem) => void;
}

const PasswordCard: React.FC<PasswordCardProps> = ({ password, onEdit }) => {
  const { deletePassword } = usePasswordContext();
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success(`${label} 已复制到剪贴板`);
    } catch (error) {
      message.error('复制失败');
    }
  };

  const handleDelete = () => {
    deletePassword(password.id);
    message.success('密码已删除');
  };

  const extraFields = [];
  if (password.email) extraFields.push({ key: '邮箱', value: password.email });
  if (password.phone) extraFields.push({ key: '手机', value: password.phone });
  if (password.secondPassword) extraFields.push({ key: '二级密码', value: password.secondPassword });

  return (
    <Card
      title={password.platform}
      extra={
        <div>
          <Tooltip title="编辑">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(password)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            />
          </Tooltip>
        </div>
      }
      style={{ marginBottom: 16 }}
    >
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontWeight: 500, marginRight: 8, minWidth: 60 }}>用户名:</span>
          <span style={{ flex: 1 }}>{password.username}</span>
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={() => copyToClipboard(password.username, '用户名')}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 500, marginRight: 8, minWidth: 60 }}>密码:</span>
          <span style={{ flex: 1, fontFamily: 'monospace' }}>
            {showPassword ? password.password : '•'.repeat(password.password.length)}
          </span>
          <Button
            type="text"
            size="small"
            icon={showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={() => setShowPassword(!showPassword)}
          />
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={() => copyToClipboard(password.password, '密码')}
          />
        </div>
      </div>

      {extraFields.length > 0 && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f0f0f0' }}>
          {extraFields.map((field, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <Tag color="blue">{field.key}</Tag>
              <span style={{ flex: 1, marginLeft: 8 }}>{field.value}</span>
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                onClick={() => copyToClipboard(field.value, field.key)}
              />
            </div>
          ))}
        </div>
      )}

      {password.notes && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #f0f0f0' }}>
          <span style={{ fontWeight: 500 }}>备注: </span>
          <span style={{ color: '#666' }}>{password.notes}</span>
        </div>
      )}
    </Card>
  );
};

export default PasswordCard;
