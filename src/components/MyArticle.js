import React,{useState, useEffect} from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { useParams } from "react-router-dom";
import { Skeleton, BackTop, Row, Col, Card, Space, Affix } from 'antd';
import { CalendarOutlined, FolderOpenOutlined, EyeOutlined } from '@ant-design/icons';
import MyMessage from './MyMessage';
import { marked } from 'marked';
import hljs from "highlight.js";
import MarkNav from 'markdown-navbar';
import 'highlight.js/styles/monokai-sublime.css'
import '../static/style/components/article.css'
import 'markdown-navbar/dist/navbar.css';

function beforNumber(code) {
  if (!code.trim()) {
    return code;
  }
  if (code.split('\n').length > 1) {
    const list = code.split('\n');
    const spanList = ['<span aria-hidden="true" line-row>'];
    list.forEach(() => {
        spanList.push('<span></span>');
    });
    spanList.push('</span>');
    list.push(spanList.join(''));
    return list.join('\n');
  } else {
    return '<span>'+code+'</span>'
  }
}

function MyArticle () {
    const params = useParams();
    const [ article, setArticle ] = useState({});
    const [ articleContent, setArticleContent ] = useState('')  //markdown
    const [ loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getArticleById + params.id).then(
                (res) => {
                  return res.data
                }
            )
            setArticle(result)
            setArticleContent(result.content)
            setLoading(false)
        }
        fetchData()
    }, [params.id])
    
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return beforNumber(hljs.highlightAuto(code).value);
        }
    });
    
    let html = marked(articleContent);
    return (
        <div className="article-card">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={20} lg={18} xl={16}  >
                    <Card>
                        <Skeleton loading={loading} active paragraph={{ rows: 24 }} >
                            <div>
                            <div className="article-title">
                                {article.title}
                            </div>
                            
                            <div className="list-icon center">
                                <Space size="large">
                                    <span><CalendarOutlined /> {article.addTime}</span>
                                    <span><FolderOpenOutlined /> {article.typeName}</span>
                                    <span><EyeOutlined /> {article.view_count}</span>
                                </Space>
                            </div>
                            
                            <div className="article-content"
                                dangerouslySetInnerHTML = {{__html: html}} >
                            </div>
                            </div>
                        </Skeleton>
                    </Card>
                    <MyMessage id={article.id}/>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={4} lg={4} xl={4}>
                    <Affix>
                        <Card className="detailed-nav comm-box">
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
                        </Card>
                    </Affix>
                    </Col>
            </Row>
            <BackTop />
        </div>
      )
}

export default MyArticle;