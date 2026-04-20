import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { PasswordItem } from '../types';
import { usePasswordContext } from '../context/PasswordContext';

interface PasswordFormProps {
  visible: boolean;
  onCancel: () => void;
  editingPassword?: PasswordItem;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ visible, onCancel, editingPassword }) => {
  const [form] = Form.useForm();
  const { addPassword, updatePassword } = usePasswordContext();
  const isEditing = !!editingPassword;

  useEffect(() => {
    if (visible) {
      if (editingPassword) {
        form.setFieldsValue(editingPassword);
      } else {
        form.resetFields();
      }
    }
  }, [visible, editingPassword, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (isEditing && editingPassword) {
        await updatePassword({ ...editingPassword, ...values });
        message.success('密码已更新');
      } else {
        await addPassword(values);
        message.success('密码已添加');
      }
      
      onCancel();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={isEditing ? '编辑密码' : '添加密码'}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={600}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {isEditing ? '更新' : '添加'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          platform: '',
          username: '',
          password: '',
          email: '',
          phone: '',
          secondPassword: '',
          notes: '',
        }}
      >
        <Form.Item
          name="platform"
          label="平台/应用名称"
          rules={[{ required: true, message: '请输入平台/应用名称' }]}
        >
          <Input placeholder="例如：GitHub、微信、支付宝" />
        </Form.Item>

        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item name="email" label="邮箱">
          <Input placeholder="请输入邮箱（可选）" />
        </Form.Item>

        <Form.Item name="phone" label="手机号">
          <Input placeholder="请输入手机号（可选）" />
        </Form.Item>

        <Form.Item name="secondPassword" label="二级密码">
          <Input.Password placeholder="请输入二级密码（可选）" />
        </Form.Item>

        <Form.Item name="notes" label="备注">
          <Input.TextArea
            placeholder="添加备注信息（可选）"
            rows={3}
            showCount
            maxLength={500}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PasswordForm;
