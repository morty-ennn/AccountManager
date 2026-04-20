import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { usePasswordContext } from '../context/PasswordContext';

const SearchBar: React.FC = () => {
  const { state, dispatch } = usePasswordContext();

  return (
    <Input
      placeholder="搜索平台/应用名称..."
      prefix={<SearchOutlined />}
      size="large"
      value={state.searchQuery}
      onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
      style={{ marginBottom: 20 }}
    />
  );
};

export default SearchBar;
