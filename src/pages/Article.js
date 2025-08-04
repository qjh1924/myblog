import React from 'react';
import { Layout, BackTop } from 'antd';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
import MyArticle from '../components/MyArticle';

const { Header, Footer, Content } = Layout;

function Article () {
    return (
        <Layout>
            <Header><MyHeader /></Header>
            <Content><MyArticle /></Content>
            <Footer><MyFooter /></Footer>
            <BackTop />
        </Layout>
    )
}

export default Article