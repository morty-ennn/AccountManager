import React from 'react';
import { Layout, Typography } from 'antd';
import { PasswordProvider } from '../context/PasswordContext';
import SearchBar from './SearchBar';
import PasswordList from './PasswordList';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <PasswordProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: '0 50px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Title level={3} style={{ margin: 0, lineHeight: '64px' }}>
            🔐 密码管理器
          </Title>
        </Header>
        <Content style={{ padding: '30px 50px', background: '#f5f5f5' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <SearchBar />
            <PasswordList />
          </div>
        </Content>
      </Layout>
    </PasswordProvider>
  );
};

export default App;
