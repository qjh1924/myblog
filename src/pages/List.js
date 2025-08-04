import { Layout, Button, BackTop } from 'antd';
import React, {useState} from 'react';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import MyFooter from '../components/MyFooter'
import MyHeader from '../components/MyHeader';
import MySider from '../components/MySider';
import MyList from '../components/MyList';
import '../static/style/Index.css'

const { Header, Footer, Sider, Content } = Layout;

function Index () {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout>
      <Header><MyHeader /></Header>
      <Layout>
        <Button size="small" type="text" className="collapseIntroBtn" onClick={() => setCollapsed(!collapsed)}>
          {React.createElement(collapsed ? CaretRightOutlined : CaretLeftOutlined )}
        </Button>
        <Sider collapsible collapsed={collapsed} collapsedWidth="0" trigger={null} style={{ height: '100%', borderRight: 0 }}>
          <MySider />
        </Sider>
        <Content>
          <MyList />
        </Content>
      </Layout>
      <Footer><MyFooter /></Footer>
      <BackTop />
    </Layout>
  )
};

export default Index;