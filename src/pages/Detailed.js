import React,{useState, useEffect} from 'react'
import {Row, Col ,Affix, Icon ,Breadcrumb, BackTop, Skeleton } from 'antd'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Message from '../components/Message'
import MarkNav from 'markdown-navbar';
import axios from 'axios'
import marked from 'marked'

import servicePath from '../config/apiUrl'
import hljs from "highlight.js";

import '../static/style/pages/detailed.css'
import '../static/style/globals.css'
import 'highlight.js/styles/monokai-sublime.css'
import 'markdown-navbar/dist/navbar.css';

function Detailed (props) {

  const [ article, setArticle ] = useState([]);
  const [ articleContent, setArticleContent ] = useState('')  //markdown
  const [ loading, setLoading] = useState(true)

  let tmpId = props.match.params.id
  
  useEffect(() => {
    const getArticle = async () =>{
      const result = await axios({
        method:'get',
        url: servicePath.getArticleById + tmpId,
        withCredentials: true,
        header:{ 'Access-Control-Allow-Origin':'*' }
      }).then(
        res=>{
          return res.data.data[0]
        }
      )
      setArticle(result)
      setArticleContent(result.article_content)
      setLoading(false)
    }
    getArticle()
  },[tmpId])

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true, // github风格
    pedantic: false, // 容错
    sanitize: false, // 忽略HTML标签
    tables: true, 
    breaks: true, // github换行符
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  
  let html = marked(articleContent)

  document.title = article.title + ' - 邱健珲的个人博客 '

  return (
    <div>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a href={'/list/' + article.typeId}>{article.typeName}</a></Breadcrumb.Item>
                  <Breadcrumb.Item> {article.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              
              <Skeleton loading={loading} active paragraph={{ rows: 24 }} >
                <div>
                  <div className="detailed-title">
                    {article.title}
                  </div>
                  
                  <div className="list-icon center">
                    <span><Icon type="calendar" /> {article.addTime}</span>
                    <span><Icon type="folder" /> {article.typeName}</span>
                    <span><Icon type="fire" /> {article.view_count}</span>
                  </div>
                  
                  <div className="detailed-content"
                    dangerouslySetInnerHTML = {{__html: html}} >
                  </div>
                </div>
              </Skeleton>
            </div>
            <Message id={article.id}/>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <Skeleton loading={loading} active paragraph={{ rows: 4 }} >
                <div className="toc-list">
                  <MarkNav
                    className="article-menu"
                    source={articleContent}
                    headingTopOffset={80}
                    ordered={false}
                  />
                </div>
              </Skeleton>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>
      <BackTop />

   </div>
  )


}
export default Detailed