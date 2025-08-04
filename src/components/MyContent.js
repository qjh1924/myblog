import React, { useState, useEffect } from 'react';
import { Card, Timeline, Tag, Space, Row, Col, Button, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import '../static/style/components/content.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function MyContent () {
    const navigate = useNavigate();
    const [pageId, setPageId] = useState(0)
    const [latestArticles, setLatestArticles] = useState([])
    useEffect(() => {
      const fetchData = async () => {
          const result = await axios(servicePath.getLatestArticles + pageId).then(
              (res) => {
                return res.data
              }
          )
          setPageId(pageId+1)
          setLatestArticles(result)
      }
      fetchData()
    }, [])
    async function loadMoreArticle () {
        const result =  await axios(servicePath.getLatestArticles + pageId).then(
            (res) => {
                return res.data
            }
        )
        if (result.length) {
            message.success('加载成功');
            setPageId(pageId+1)
            setLatestArticles([...latestArticles, ...result])
        } else {
            message.warning('没有更多啦')
        }
    }
    const toDetailed = (id)=>{
        navigate('/blog/'+id)
    }
    const tagColors = ['gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple', 'magenta', 'red', 'volcano', 'orange']
    let colorIndex = 0
    return (
        <div className='content'>
            <Card title="最新文章">
                <Timeline>
                    {
                        latestArticles.map(item => {
                            return (
                                <Timeline.Item color="#777" dot={<SendOutlined />}>
                                    <div className="content-timer">Post on {item.addTime}</div>
                                    <Card onClick={()=>toDetailed(item.id)}>
                                        <Row>
                                            <Col key={item.id} xs={0} sm={0} md={24} lg={24} xl={24}>
                                                <Space>
                                                    <div className="content-title">{item.title}</div>
                                                    {
                                                        item.tags.split(',').map( tag => {
                                                            if (colorIndex === tagColors.length) {
                                                                colorIndex = 0
                                                            }
                                                            return (
                                                                <Tag color={tagColors[colorIndex++]}>{tag}</Tag>
                                                            )
                                                        })
                                                    }
                                                </Space>
                                            </Col>
                                            <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                                                <div className="content-title">{item.title}</div>
                                                <div className="content-tag">
                                                    {
                                                        item.tags.split(',').map( tag => {
                                                            if (colorIndex === tagColors.length) {
                                                                colorIndex = 0
                                                            }
                                                            return (
                                                                <Tag color={tagColors[colorIndex++]}>{tag}</Tag>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="content-intro">
                                            {item.introduce}
                                        </div>
                                    </Card>
                                </Timeline.Item>
                            )
                        })
                    }
                </Timeline>
                <Button type="link" block onClick={loadMoreArticle}>
                    加载更多
                </Button>
            </Card>
        </div>
    )
}

export default MyContent;